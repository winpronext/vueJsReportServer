<template>
  <div>
    <b-row>
      <b-col>
        <b-button variant="primary" @click="addUser" style="margin-right: 6px">Добавить</b-button>
        <b-button variant="info" @click="changeUser" style="margin-right: 6px">Изменить</b-button>
        <b-button variant="danger" @click="deleteUser" style="margin-right: 6px">Удалить</b-button>
      </b-col>
    </b-row>
    <b-row><br></b-row>
    <b-row>
      <b-col>
        <b-table
          hover
          bordered
          striped
          selectable
          :fields="fields"
          :select-mode="selectMode"
          selectedVariant="success"
          :items="items"
          @row-selected="rowSelected"
        ></b-table>
      </b-col>
    </b-row>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Введите данные"
      @ok="handleOk"
      @hidden="resetModal"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Имя"
          label-for="name-input"
          invalid-feedback="name is required"
        >
          <b-form-input :disabled="item.id===-1"
                        id="name-input"
                        v-model="item.name"
                        required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="Сервер"
                      label-for="name-input"
                      invalid-feedback="Server is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.server"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="База данных"
                      label-for="name-input"
                      invalid-feedback="DB is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.db"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="Логин"
                      label-for="name-input"
                      invalid-feedback="login is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.login"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
                      label="Пароль"
                      label-for="name-input"
                      invalid-feedback="password is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.password"
            required
          ></b-form-input>
        </b-form-group>
        <label class="typo__label">Тип базы данных</label>
        <multiselect v-model="item.typeSource" deselect-label="" select-label=""
                     track-by="dbType" label="dbType"
                     placeholder="Выберите тип сервера запроса"
                     :options="sourceTypes" :searchable="false"
                     :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ option }">{{ option.dbType }}
          </template>
        </multiselect>
      </form>
    </b-modal>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'source',
  data () {
    return {
      items: [],
      selectMode: 'single',
      fields: [
        {key: 'name', sortable: true, label: 'Имя'},
        {key: 'server', sortable: true, label: 'Сервер'},
        {key: 'db', sortable: true, label: 'база данных'},
        {key: 'login', sortable: true, label: 'Логин пользователя'},
        {key: 'typeSource.dbType', sortable: true, label: 'Тип базы данных'}
      ],
      selected: [],
      item: {},
      box: '',
      sourceTypes: []
    }
  },
  methods: {
    rowSelected (items) {
      this.selected = items
    },
    userListGet () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.get(this.$store.state.baseUrl + 'api/Source/GetSource', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        this.items = response.data
      }).catch(error => {
        this.$store.commit('hidePreloader')
        alert(error.data)
      })
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit () {
      if (this.item.login !== '') {
        if (this.item.id === 0) {
          if (this.item.password !== '') {
            delete this.item.id
            this.$store.commit('showPreloader')
            this.$store.commit('updateToken')
            await axios.post(this.$store.state.baseUrl + 'api/Source/CreateSource', this.item, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.$store.state.token
              }
            }).then(
              this.$store.commit('hidePreloader')
            ).catch(error => {
              this.$store.commit('hidePreloader')
              alert(error.data)
            })
          } else {
            alert('Password is empty')
            return
          }
        } else {
          this.$store.commit('showPreloader')
          this.$store.commit('updateToken')
          await axios.put(this.$store.state.baseUrl + 'api/Source/ChangeSource', this.item, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.$store.state.token
            }
          }).then(
            this.$store.commit('hidePreloader')
          ).catch(error => {
            this.$store.commit('hidePreloader')
            alert(error.data)
          })
        }
        this.userListGet()
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      } else {
        alert('Login is empty')
      }
    },
    resetModal () {
      this.item = {}
    },
    addUser () {
      this.item = {
        id: 0,
        login: '',
        surname: '',
        name: '',
        middlename: '',
        email: '',
        password: ''
      }
      this.$refs['modal'].show()
    },
    changeUser () {
      if (this.selected.length !== 0) {
        this.item = this.selected[0]
        this.$refs['modal'].show()
      }
    },
    async deleteUser () {
      if (this.selected.length !== 0) {
        this.item = this.selected[0]
        this.showMessage()
      }
    },
    showMessage () {
      this.box = ''
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete source.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        this.box = value
        this.deleteUserQuery()
      })
    },
    async deleteUserQuery () {
      if (this.box === true) {
        this.$store.commit('showPreloader')
        this.$store.commit('updateToken')
        await axios.delete(this.$store.state.baseUrl + 'api/Source/DeleteSource', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.state.token
          },
          params: {
            id: this.item.id
          }
        }).then(
          this.$store.commit('hidePreloader')
        ).catch(error => {
          this.$store.commit('hidePreloader')
          alert(error.data)
        })
        this.userListGet()
      }
    }
  },
  created () {
    this.userListGet()
    this.$store.commit('showPreloader')
    this.$store.commit('updateToken')
    axios.get(this.$store.state.baseUrl + 'api/Report/GetTypeSource', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    }).then(response => {
      this.$store.commit('hidePreloader')
      this.sourceTypes = response.data
    }).catch(error => {
      this.$store.commit('hidePreloader')
      alert(error.data)
    })
  }
}
</script>

<style scoped>

</style>

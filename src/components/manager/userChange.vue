<template>
  <div>
    <b-row>
        <b-button variant="primary" @click="addUser" style="margin-right: 6px">Добавить</b-button>
        <b-button variant="info" @click="changeUser" style="margin-right: 6px">Изменить</b-button>
        <b-button variant="warning" @click="changePassword" style="margin-right: 6px">Изменить пароль</b-button>
        <b-button variant="danger" @click="deleteUser" style="margin-right: 6px">Удалить</b-button>
    </b-row>
    <b-row><br></b-row>
    <b-row>
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
    </b-row>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @ok="handleOk"
      @hidden="resetModal"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Login"
          label-for="name-input"
          invalid-feedback="Login is required"
        >
          <b-form-input :disabled="item.id===-1"
                        id="name-input"
                        v-model="item.login"
                        required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="Surname"
                      label-for="name-input"
                      invalid-feedback="Surname is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.surname"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="Name"
                      label-for="name-input"
                      invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="middlename"
                      label-for="name-input"
                      invalid-feedback="middlename is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.middlename"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id!==-1"
                      label="Email"
                      label-for="name-input"
                      invalid-feedback="Email is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.id < 1"
                      label="password"
                      label-for="name-input"
                      invalid-feedback="password is required"
        >
          <b-form-input
            id="name-input"
            v-model="item.password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'userChange',
  data () {
    return {
      items: [],
      selectMode: 'single',
      fields: [
        {key: 'login', sortable: true, label: 'Логин'},
        {key: 'surname', sortable: true, label: 'Фамилия'},
        {key: 'name', sortable: true, label: 'Имя'},
        {key: 'middlename', sortable: true, label: 'Отчество'},
        {key: 'email', sortable: true, label: 'Email'}
      ],
      selected: [],
      item: {},
      box: ''
    }
  },
  methods: {
    rowSelected (items) {
      this.selected = items
    },
    userListGet () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.get(this.$store.state.baseUrl + 'api/Account/UserList', {
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
            await axios.post(this.$store.state.baseUrl + 'api/Account/Registry', this.item, {
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
        } else if (this.item.id === -1) {
          if (this.item.password !== '') {
            this.$store.commit('showPreloader')
            this.$store.commit('updateToken')
            await axios.put(this.$store.state.baseUrl + 'api/Account/UserChangePassword', this.item, {
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
          await axios.put(this.$store.state.baseUrl + 'api/Account/UserChange', this.item, {
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
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete user.', {
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
        await axios.delete(this.$store.state.baseUrl + 'api/Account/UserDelete', {
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
    },
    async changePassword () {
      if (this.selected.length !== 0) {
        this.item = this.selected[0]
        this.item.id = -1
        this.item.password = ''
        this.$refs['modal'].show()
      }
    }
  },
  created () {
    this.userListGet()
  }
}
</script>

<style scoped>

</style>

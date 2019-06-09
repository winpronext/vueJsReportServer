<template>
  <div>
    <b-row align-h="center">
      <b-col cols="3" class="d-flex justify-content-center">
        <b-button @click="loadTemplate()" variant="primary">Загрузить шаблон</b-button>
      </b-col>
    </b-row>
    <b-row><br></b-row>
    <b-form @submit="onSubmit">
      <b-row align-h="center">
        <b-col cols="6" class="d-flex justify-content-center">
          <b-form-file ref="inputFile" v-model="file" :state="Boolean(this.file)" placeholder="Выберите Excel файл" accept=".xls, .xlsx" required></b-form-file>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="3"  class="d-flex justify-content-center">
          <b-button type="submit" variant="primary">Отправить</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row class="container-shortlist">
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="(item,index) in items" :key=index>
            <b-row>
              <b-col>
                <b>ID:</b> {{item.name}}
              </b-col>
              <b-col>
                <b>Статус:</b> {{item.status}}
              </b-col>
              <b-col cols="6">
                <b>ТУ:</b> {{item.tu}}
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b>Город:</b> {{item.city}}
              </b-col>
              <b-col>
                <b>Тип зоны:</b> {{item.typeZone}}
              </b-col>
              <b-col cols="6">
                <b>Модель:</b> {{item.model}}
              </b-col>
            </b-row>
            <b-row class="d-flex justify-content-end">
              <router-link :to="{name:'detailList',params:{id:item.name}}" target="_blank" style="padding-right: 1rem">
                <b-button size="sm" variant="primary">Подробнее</b-button>
              </router-link>
            </b-row>
            <b-row v-if="item.errors.length !== 0">
              <b-col>
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-btn block v-b-toggle="'accordion'+index" variant="danger">Ошибки</b-btn>
                </b-card-header>
                <b-collapse v-bind:id="'accordion'+index" :accordion="'my-accordion'+index" role="tabpanel">
                  <b-card-body>
                    <b-list-group>
                      <b-list-group-item v-for="(error,index) in item.errors" :key=index>
                        <b-row>
                          <b-col>
                            {{error}}
                          </b-col>
                        </b-row>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-body>
                </b-collapse>
              </b-card>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-modal ref="errorInput" size="lg" centered no-close-on-esc no-close-on-backdrop hide-footer title="Ошибки">
      <div v-for="(error,index) in errorList" :key=index>
        <b-row>
          <b-col>
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block v-b-toggle="'accordionerror'+index" variant="danger">{{error.atm}}</b-btn>
              </b-card-header>
              <b-collapse visible v-bind:id="'accordionerror'+index" :accordion="'my-accordion-modal'+index" role="tabpanel">
                <b-card-body>
                  <b-list-group>
                    <b-list-group-item v-for="(err,index) in error.errors" :key=index>
                      <b-row>
                        <b-col>
                          {{err}}
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                  </b-list-group>
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'addXLSdata',
  data: function () {
    return {
      file: null,
      items: [],
      errorList: [],
      data: ''
    }
  },
  methods: {
    onSubmit: function (evt) {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      const formData = new FormData()
      formData.append('file', this.file)
      axios.post(this.$store.state.baseUrl + 'api/ATMDevices/ImportExcelFile', formData, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        if (response.data.status === 0) {
          alert(response.data.errorMessage)
          return
        }
        let items = response.data.message.atmList
        let errorList = response.data.message.errorList
        items.forEach(item => {
          item.errors = []
          let t = errorList.find(f => f.atm === item.name)
          let index = errorList.findIndex(f => f.atm === item.name)
          if (index !== -1) {
            errorList.splice(index, 1)
          }
          if (typeof t !== 'undefined') {
            item.errors = t.errors
          }
        })
        this.items = items.sort(function (a, b) {
          if (a.errors.length > b.errors.length) {
            return -1
          } else return 1
        })
        this.errorList = errorList
        this.clearFiles()
        if (this.errorList.length !== 0) {
          this.$refs.errorInput.show()
        }
      }).catch(error => {
        this.$store.commit('hidePreloader')
        if (error.response !== undefined) {
          if (error.response.data.message === 'Authorization has been denied for this request.') {
            this.$store.state.previosUrl = window.location.href
            this.$router.push({name: 'Auth'})
          } else {
            alert(error.response.data.message + '\n' + error.response.data.errorMessage)
          }
        } else {
          alert(error.message)
        }
      })
    },
    clearFiles () {
      this.$refs.inputFile.reset()
    },
    loadTemplate () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.get(this.$store.state.baseUrl + 'api/ATMDevices/GetTemplateExcel', {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Accept': 'application/vnd.ms-excel'
        },
        responseType: 'arraybuffer'
      }).then(response => {
        this.$store.commit('hidePreloader')
        if (response.data.status === 0) {
          alert(response.data.errorMessage)
          return
        }
        let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'TemplateATM.xlsx'
        link.click()
      }).catch(error => {
        this.$store.commit('hidePreloader')
        if (error.response !== undefined) {
          if (error.response.data.message === 'Authorization has been denied for this request.') {
            this.$store.state.previosUrl = window.location.href
            this.$router.push({name: 'Auth'})
          } else {
            alert(error.response.data.message + '\n' + error.response.data.errorMessage)
          }
        } else {
          alert(error.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .btn-primary{
    border-color: #004997;
    background-color: #004997;
    margin-top: 0.5rem;
  }
  .container-shortlist {
    margin-top: 0.5rem;
  }
  .row-align-right {
    float: right;
  }
  .mb-1{
    margin-top: 0.5rem;
  }
  .card{
    border: 1px solid rgb(220, 53, 69)
  }
</style>

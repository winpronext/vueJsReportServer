<template>
    <div>
      <b-btn variant="primary" block @click="showModalExportXLS()">Экспорт XLS</b-btn>
      <b-modal ref="exportXlsModal" size="lg" id="exportXlsModal" centered no-close-on-esc no-close-on-backdrop hide-footer title="Экспорт в XLS">
        <b-row>
          <b-col>Выберите необходимые поля</b-col>
          <b-col>
            <b-btn class="mb-3" variant="primary" block @click="selectAll" v-if="fullSelect">Выбрать все</b-btn>
            <b-btn class="mb-3" variant="danger" block @click="resetSelect" v-else>Сбросить</b-btn>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group>
              <b-form-checkbox-group v-model="selected"
                                     buttons
                                     button-variant="primary"
                                     name="buttons2"
                                     :options="options"
                                     text-field="value"
                                     value-field="key"
                                     id="checkboxBlock">
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
          <b-btn class="mt-3" variant="primary" block @click="downloadXls">Загрузить</b-btn>
          </b-col>
        </b-row>
      </b-modal>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'export-xls',
  props: ['filter'],
  data: function () {
    return {
      options: [],
      selected: []
    }
  },
  computed: {
    fullSelect: function () {
      if (this.selected.length === 0) {
        return true
      } else return false
    }
  },
  methods: {
    showModalExportXLS () {
      this.$refs.exportXlsModal.show()
    },
    downloadXls () {
      let data = {}
      data.searchObject = this.filter
      let out = this.options
      let selected = this.selected
      for (let i = 0; i < out.length; i++) {
        out[i].IsShow = false
        let t = selected.find(function (el) {
          return el === this.key
        }, out[i])
        if (t !== undefined) out[i].IsShow = true
        if (out[i].key === 'AmtName') out[i].IsShow = true
      }
      data.fields = out
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.post(this.$store.state.baseUrl + 'api/ATMDevices/ExportToExcel', JSON.stringify(data), {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Accept': 'application/vnd.ms-excel',
          'Content-Type': 'application/json'
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
        link.download = 'ExportXLS.xlsx'
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
      this.$refs.exportXlsModal.hide()
    },
    selectAll () {
      this.selected = Array.from(this.options, item => item.key)
    },
    resetSelect () {
      this.selected = []
    }
  },
  mounted () {
    this.$store.commit('showPreloader')
    this.$store.commit('updateToken')
    axios.get(this.$store.state.baseUrl + 'api/ATMDevices/GetAtmFields', {
      headers: {
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    }).then(response => {
      this.$store.commit('hidePreloader')
      if (response.data.status === 0) {
        alert(response.data.errorMessage)
        return
      }
      this.options = response.data.message
      this.options.map(el => {
        el.disabled = el.key === 'AtmName'
      })
    }).catch(error => {
      this.$store.commit('hidePreloader')
      if (error.response !== undefined) {
        if (error.response.data.message === 'Authorization has been denied for this request.') {
          this.$store.commit('previusURL')
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
</script>

<style scoped>
  .btn-group{
    display: block;
  }
</style>
<style>
  #checkboxBlock .btn-primary {
    border-radius: 0 !important;
    border: 0.02rem solid white;
    width: 33.3333%;
  }
  #checkboxBlock label{
    margin-left: 0px;
  }
</style>

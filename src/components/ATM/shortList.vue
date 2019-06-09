<template>
  <div class="shortList">
    <b-row>
      <b-col cols="3" class="filter-conteiner">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="IDGroup"
                        label="ID"
                        label-for="id">
            <multiselect id="id" v-model="filter.Id" :options="[]" :searchable="true"
                         :close-on-select="false" deselect-label="" select-label="" :allow-empty="true"
                         placeholder="Введите ID" :multiple="true" :taggable="true" :show-no-results="false"
                         @tag="addTagID" @search-change="searchChangeID" tag-placeholder="Enter">
            </multiselect>
          </b-form-group>
          <b-form-group id="statusGroup"
                        label="Статус"
                        label-for="status">
            <multiselect id="status" v-model="filter.Status" :options="$store.state.ATMlists.status" :searchable="true"
                         :close-on-select="false" deselect-label="" select-label="" :allow-empty="true"
                         placeholder="Выберите статус" :multiple="true" :taggable="true"></multiselect>
          </b-form-group>
          <label class="modelFilter">Модель</label>
          <multiselect v-model="filter.Model" :close-on-select="false" deselect-label="" select-label=""
                       placeholder="Выберите модель" label="value" track-by="value"
                       :options="$store.state.ATMlists.data.atmModel" :multiple="true" :taggable="true"></multiselect>
          <label class="tuFilter">ТУ</label>
          <multiselect v-model="filter.Tu" :close-on-select="false" deselect-label="" select-label=""
                       placeholder="Выберите ТУ" label="value" track-by="value"
                       :options="$store.state.ATMlists.data.tu" :multiple="true" :taggable="true"></multiselect>
          <b-form-group id="CityGroup"
                        label="Город"
                        label-for="City">
            <multiselect id="City" v-model="filter.City" :options="[]" :searchable="true"
                         :close-on-select="false" deselect-label="" select-label="" :allow-empty="true"
                         placeholder="Введите город" :multiple="true" :taggable="true"
                         @tag="addTagCity" tag-placeholder="Enter"></multiselect>
          </b-form-group>
          <label class="outsourseFilter">Аутсорсинговая компания</label>
          <multiselect v-model="filter.AutsourceCompany" :close-on-select="false" deselect-label="" select-label=""
                       placeholder="Выберите аутсорсинговую компанию" label="value" track-by="value"
                       :options="$store.state.ATMlists.data.atmAutsource" :multiple="true" :taggable="true"></multiselect>
          <label class="currencyFilter">Поддерживаемые валюты</label>
          <multiselect v-model="filter.Currency" :close-on-select="false" deselect-label="" select-label=""
                       placeholder="Выберите валюты"
                       :options="$store.state.ATMlists.currency" :multiple="true" :taggable="true"></multiselect>
          <label class="classificationFilter">Классификация</label>
          <multiselect v-model="filter.ClassificateUS" :close-on-select="false" deselect-label=""
                       select-label="" placeholder="Выберите типы" label="value" track-by="value"
                       :options="$store.state.ATMlists.data.atmClass" :multiple="true"
                       :taggable="true"></multiselect>
          <label class="classificationFilter">Вид УС</label>
          <multiselect v-model="filter.vidUS" :close-on-select="false" deselect-label=""
                       select-label="" placeholder="Выберите виды" label="value" track-by="value"
                       :options="$store.state.ATMlists.data.atmVidUs" :multiple="true"
                       :taggable="true"></multiselect>
          <br>
          <b-button type="submit" variant="primary">Поиск</b-button>
          <b-button type="reset" variant="danger">Сбросить</b-button>
          <br>
          <b>Всего найдено УС:</b> {{maxRows}}
        </b-form>
      </b-col>
      <b-col>
        <b-row>
          <b-col cols="6">
            <b-pagination align="right" size="md" :total-rows="maxRows" v-model="currentPage"
                          :per-page="limits">
            </b-pagination>
          </b-col>
          <b-col cols="4">
            <multiselect id="maxRows" v-model="limits" :options="[10,25,50,100]" :searchable="false"
                         :close-on-select="true" deselect-label="" select-label="" :allow-empty="false"
                         selectedLabel="" style="width: 70px"></multiselect>
          </b-col>
          <b-col cols="2">
            <export-xls :filter="filter"></export-xls>
          </b-col>
        </b-row>
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
                    <b>Город:</b><br> {{item.city}}
                  </b-col>
                  <b-col>
                    <b>Тип зоны:</b><br> {{item.typeZone}}
                  </b-col>
                  <b-col cols="6">
                    <b>Модель:</b><br> {{item.model}}
                  </b-col>
                </b-row>
                <b-row class="row-align-right">
                  <router-link :to="{name:'detailList', params:{id:item.name}}" target="_blank" style="padding-right: 1rem">
                    <b-button size="sm" variant="primary">Подробнее</b-button>
                  </router-link>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal ref="myModalError" hide-footer title="Что-то пошло не так">
      <div class="d-block text-center">
        <h3>{{errorPageMessage}}</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="closeModal">Закрыть</b-btn>
    </b-modal>
  </div>
</template>

<script>
import exportXls from './exportXls'
const axios = require('axios')

export default {
  name: 'shortList',
  data: function () {
    return {
      items: [],
      filter: {
        Id: [],
        City: [],
        Model: [],
        Tu: [],
        AutsourceCompany: [],
        Currency: [],
        ClassificateUS: [],
        Status: [],
        vidUS: []
      },
      currentPage: 1,
      limits: 10,
      maxRows: 120,
      errorPageMessage: ''
    }
  },
  components: {
    exportXls: exportXls
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.getShortList()
    },
    onReset (evt) {
      evt.preventDefault()
      this.filter.Id = []
      this.filter.city = []
      this.filter.Model = []
      this.filter.Tu = []
      this.filter.AutsourceCompany = []
      this.filter.Currency = []
      this.filter.ClassificateUS = []
      this.filter.Status = []
      this.filter.vidUS = []
    },
    addTagID (newTag) {
      if (newTag.length === 7) {
        const tag = newTag
        this.filter.Id.push(tag)
      } else {
        this.errorPageMessage = 'ID должен быть 7 символов (J123456)'
        this.$refs.myModalError.show()
      }
    },
    closeModal () {
      this.$refs.myModalError.hide()
    },
    addTagCity (newTag) {
      const tag = newTag
      this.filter.City.push(tag)
    },
    searchChangeID (newTag) {
      if (newTag.indexOf(' ') > 0) {
        this.addTagID(newTag.trim(' '))
        this.$children[0].$children[0].search = ''
      }
    },
    getShortList () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      let data = JSON.stringify(this.filter)
      axios.post(this.$store.state.baseUrl + 'api/ATMDevices/GetAtmList', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        },
        params: {
          Page: this.currentPage - 1,
          Limit: this.limits
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        if (response.data.status === 0) {
          alert(response.data.errorMessage)
          return
        }
        this.items = response.data.message.atmList
        this.maxRows = parseInt(response.data.message.maxPages)
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
  },
  created () {
    if (localStorage.filter != null) {
      this.filter = JSON.parse(localStorage.getItem('filter'))
    }
    if (localStorage.limits != null) {
      this.limits = JSON.parse(localStorage.getItem('limits'))
    }
    if (this.$store.state.ATMlists.data.atmModel.length === 0) {
      this.$store.dispatch('getATMLists')
    }
    this.getShortList()
  },
  updated () {
    localStorage.setItem('filter', JSON.stringify(this.filter))
    localStorage.setItem('limits', JSON.stringify(this.limits))
  },
  watch: {
    limits: function () {
      this.getShortList()
    },
    currentPage: function () {
      this.getShortList()
    }
  }
}
</script>

<style scoped>
  .row-align-right {
    float: right;
  }
</style>
<style>
  .shortList .btn-primary {
    border-color: #004997;
    background-color: #004997;
  }
  .shortList .multiselect__option{
    white-space: normal;
  }
  .shortList .multiselect__tag{
    background-color: #004997;
  }
  .shortList .multiselect__option--highlight{
    background-color: #004997;
  }
  .shortList .multiselect__tag-icon:after {
    color: white;
  }
  .shortList .multiselect__tags {
     border: 1px solid #ced4da;
    min-height: 43px;
   }
  .shortList .page-item.active .page-link{
    background-color: #004997;
    border-color: #004997;
  }
  .shortList .page-link{
    color: #004997;
  }
  .shortList .multiselect__content-wrapper .multiselect__content li:last-child {
    display: none;
  }
</style>

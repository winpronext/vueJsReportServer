<template>
    <div>
      <b-row>
        <b-col>
        <label class="typo__label">Тип базы данных</label>
        <multiselect v-model="item.sourceType" deselect-label="" select-label=""
                     track-by="dbType" label="dbType"
                     placeholder="Выберите тип сервера запроса"
                     :options="sourceTypes" :searchable="false"
                     :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ option }">{{ option.dbType }}
          </template>
        </multiselect>
        </b-col>
      </b-row>
      <b-row v-if="item.sourceType.id !== undefined">
        <b-col>
        <label class="typo__label">Источник</label>
        <multiselect v-model="item.source" deselect-label="" select-label=""
                     track-by="name" label="name"
                     placeholder="Выберите тип сервера запроса"
                     :options="sources" :searchable="false"
                     :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}
          </template>
        </multiselect>
        </b-col>
      </b-row>
      <b-row v-if="item.sourceType.id !== undefined && item.source.id !== undefined">
        <b-col>
        <b-form-group id="NameReport"
                      label="Название отчета"
                      label-for="NameReportInput">
          <b-form-input id="NameReportInput"
                        type="text"
                        v-model="item.reportName"
                        placeholder="Введите название отчета">
          </b-form-input>
        </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="item.sourceType.id !== undefined && item.source.id !== undefined">
        <b-col>
          <b-form-group id="query"
                        label="Запрос"
                        label-for="queryInput">
            <b-form-textarea id="queryInput"
                             v-model="item.query"
                             placeholder="Введите запрос"
                             :rows="5"
                             :max-rows="20">
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="item.sourceType.id !== undefined && item.source.id !== undefined">
        <b-col>
          <b-button type="submit" variant="primary" @click="testSelect()">Test</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3 v-if="testAnswer === 'Query is not problem'" style="color: green">{{testAnswer}}</h3>
          <h3 v-else style="color: red">{{testAnswer}}</h3>
        </b-col>
      </b-row>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'createReport',
  data () {
    return {
      item: {
        sourceType: {},
        source: {},
        reportName: '',
        query: ''
      },
      sourceTypes: [],
      sources: [],
      testAnswer: ''
    }
  },
  mounted () {
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
    this.$store.commit('showPreloader')
    this.$store.commit('updateToken')
    axios.get(this.$store.state.baseUrl + 'api/Report/GetSource', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    }).then(response => {
      this.$store.commit('hidePreloader')
      this.sources = response.data
    }).catch(error => {
      this.$store.commit('hidePreloader')
      alert(error.data)
    })
  },
  methods: {
    testSelect () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.post(this.$store.state.baseUrl + 'api/Report/TestSelect', this.item, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        this.testAnswer = 'Query is not problem'
      }).catch(error => {
        this.$store.commit('hidePreloader')
        this.testAnswer = 'Query is problem ' + error
      })
    }
  }
}
</script>

<style scoped>

</style>

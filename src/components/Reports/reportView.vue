<template>
    <div>
      <b-row>
        <b-col>
          <b-button variant="primary" style="float: left" @click="changeReport()">Редактировать</b-button>
        </b-col>
      </b-row>
      <b-row><br></b-row>
      <b-row>
        <b-col>
          <b-table
            hover
            bordered
            striped
            small
            :items="items"
          ></b-table>
        </b-col>
      </b-row>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'reportView',
  data () {
    return {
      items: []
    }
  },
  created () {
    this.$store.commit('showPreloader')
    this.$store.commit('updateToken')
    axios.get(this.$store.state.baseUrl + 'api/Report/GetReport', {
      params: {
        reportid: this.$route.params.item.reportId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    }).then(response => {
      this.$store.commit('hidePreloader')
      this.items = response.data
    }).catch(error => {
      this.$store.commit('hidePreloader')
      alert(error)
    })
  },
  methods: {
    changeReport () {
      this.$router.push({name: 'createReport', params: {report: this.$route.params.item}})
    }
  }
}
</script>

<style scoped>

</style>

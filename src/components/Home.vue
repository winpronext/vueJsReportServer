<template>
    <div>
      <b-row>
        <b-col>
          <router-link :to="{name:'createReport', params:{directory:directory}}">
            <b-button variant="primary" style="float: right">Создать отчет</b-button>
          </router-link>
        </b-col>
        <b-col cols="2">
          <router-link :to="{name:'createDirectory', params:{directory:directory}}">
            <b-button variant="primary" style="float: right">Создать папку</b-button>
          </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-list-group>
          <b-list-group-item v-for="(item,index) in items" :key=index>
            <b>{{getShortDirectory(item.url)}}</b>
            <b-col></b-col>
          </b-list-group-item>
        </b-list-group>
      </b-row>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Home',
  data () {
    return {
      directory: '/Home',
      items: []
    }
  },
  methods: {
    getDirectory () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.get(this.$store.state.baseUrl + 'api/Directory/GetDirectory', {
        params: {
          directory: this.directory
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
        alert(error.data)
      })
    },
    getShortDirectory (dir) {
      let i = dir.split('/')
      let j = i[i.length - 1]
      return j
    }
  },
  watch: {
    directory: function () {
      this.getDirectory()
    }
  },
  created () {
    this.getDirectory()
  }
}
</script>

<style scoped>

</style>

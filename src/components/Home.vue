<template>
    <div>
      <b-row>
        <b-col>
          <b-button variant="primary" style="float: left" @click="back()">Назад</b-button>
        </b-col>
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
        <b-col cols="1"></b-col>
        <h2>{{directory}}</h2>
      </b-row>
      <b-row>
        <br>
      </b-row>
      <b-row>
        <b-col>
        <b-list-group>
          <div v-for="(item,index) in items" :key=index>
            <b-list-group-item v-if="item.isReport === 0">
              <b-row>
              <b-col @click="changeDirectory(item.url)">
                <img src="../assets/directory.png" height="30" width="30"/>
                <b style="font-size: 20pt; padding-left: 10px">{{getShortDirectory(item.url)}}</b>
              </b-col>
              <b-col cols="2">
              <b-button variant="danger" style="float: right" @click="deleteDir(item)">Удалить</b-button>
              </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item v-if="item.isReport === 1" >
              <b-row>
                <b-col  @click="reportView(item)">
              <img src="../assets/file.png" height="30" width="30"/>
              <b  style="font-size: 20pt; padding-left: 10px">{{getShortDirectory(item.url)}}</b>
                </b-col>
                <b-col cols="2">
              <b-button variant="danger" style="float: right" @click="deleteDir(item)">Удалить</b-button>
                </b-col>
              </b-row>
            </b-list-group-item>
          </div>
        </b-list-group>
        </b-col>
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
    },
    changeDirectory (url) {
      this.directory = url
    },
    back () {
      let i = this.directory.split('/')
      if (i.length < 3) {
        return ''
      }
      let t = ''
      for (let n = 0; n < i.length - 1; n++) {
        if (i[n] !== '') {
          t += '/' + i[n]
        }
      }
      this.directory = t
    },
    reportView (item) {
      this.$router.push({name: 'reportView', params: {item: item}})
    },
    deleteDir (item) {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.post(this.$store.state.baseUrl + 'api/Directory/DeleteDirectory', item, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        this.getDirectory()
      }).catch(error => {
        this.$store.commit('hidePreloader')
        alert(error.data)
      })
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

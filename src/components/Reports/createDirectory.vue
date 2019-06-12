<template>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Имя директории" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="directory.directoryName"
            required
            placeholder="Введите имя"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'createDirectory',
  data () {
    return {
      directory: {
        directoryName: ''
      }
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      this.directory.directoryPrefics = this.$route.params.directory
      await axios.put(this.$store.state.baseUrl + 'api/Directory/CreateDirectory', this.directory, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        this.$router.push({name: 'Home'})
        location.reload()
      }).catch(error => {
        this.$store.commit('hidePreloader')
        alert(error.data)
      })
    }
  }
}
</script>

<style scoped>

</style>

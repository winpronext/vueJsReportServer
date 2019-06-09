<template>
  <div>
    <br><br><br><br><br><br><br><br><br>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <b-card class="text-center">
          <h2>Авторизация</h2>
          <b-form @submit="onSubmit">
            <b-form-group id="authLoginGroup"
                          label="Логин"
                          label-for="authLogin" horizontal>
              <b-form-input id="authLogin"
                            type="text"
                            v-model="autorithation.userName"
                            required
                            placeholder="Введите логин">
              </b-form-input>
            </b-form-group>
            <b-form-group id="authPasswordGroup"
                          label="Пароль"
                          label-for="authPassword" horizontal>
              <b-form-input id="authPassword"
                            type="password"
                            v-model="autorithation.password"
                            required
                            placeholder="Введите пароль">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Войти</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Auth',
  data: function () {
    return {
      autorithation: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$store.commit('showPreloader')
      var data = JSON.stringify(this.autorithation)
      // var myHeaders = new Headers()
      // myHeaders.append('Content-Type', 'application/json')
      // var myInit = { method: 'POST',
      //   headers: myHeaders,
      //   body: data
      // }
      // var myRequest = new Request(this.$store.state.baseUrl + 'api/Account/Token', myInit)
      // fetch(myRequest).then(response => {
      //   this.$store.commit('hidePreloader')
      //   response.json().then(data => {
      //     if (data.message) {
      //       if (data.message === 'Incorrect user or password') {
      //         alert('Неверные данные авторизации')
      //         this.autorithation.password = ''
      //         return
      //       } else {
      //         alert(data.message)
      //         this.autorithation.password = ''
      //         return
      //       }
      //     }
      //     localStorage.setItem('user', JSON.stringify(data.user))
      //     localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
      //     if (this.$store.state.previosUrl.length === 0) {
      //       this.$router.push({name: 'Home'})
      //     } else location.href = this.$store.state.previosUrl
      //   })
      // }).catch(error => {
      //   this.$store.commit('hidePreloader')
      //   if (error.response !== undefined) {
      //     if (error.response.data.message === 'Incorrect user or password') {
      //       alert('Неверные данные авторизации')
      //       this.autorithation.password = ''
      //     }
      //   } else {
      //     alert(error.message)
      //   }
      // })
      axios.post(this.$store.state.baseUrl + 'api/Account/Token', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.$store.commit('hidePreloader')
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
        this.$store.state.token = response.data.accessToken
        if (this.$store.state.previosUrl.length === 0) {
          this.$router.push({name: 'Home'})
        } else location.href = this.$store.state.previosUrl
      }).catch(error => {
        this.$store.commit('hidePreloader')
        if (error && error.response && error.response.status === 401) {
          alert('Неверные данные авторизации')
          this.autorithation.password = ''
        } else {
          alert(error.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

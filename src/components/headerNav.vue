<template>
  <b-navbar id="headerNav" class="header-nav-cl" toggleable="md" type="dark">
    <b-navbar-brand to="/">
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item-dropdown text="Отчеты" left>
        <b-dropdown-item :to="{name:'Home'}">Главная</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Управление" left>
        <b-dropdown-item :to="{name:'userChange'}">Пользователи</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-button type="primary" disabled>{{userName}}</b-button>
      <b-button type="primary" variant="primary" @click="logout()">Выйти</b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'headerNav',
  computed: {
    userName: function () {
      let user = JSON.parse(localStorage.getItem('user')).login
      return user
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      this.$store.commit('previusURL')
      this.$router.push({name: 'Auth'})
    }
  }
}
</script>

<style scoped>
  .navbar-brand{
    padding-top: 0px;
    padding-bottom: 0px;
    margin-left: 0.5rem;
    margin-right: 0rem;
  }
  .btn-secondary {
    background-color: #004997;
    border-color: #004997;
  }
  .btn-primary {
    background-color: #004997;
    border-color: #004997;
  }
  .nav-link{
    padding: 0px;
  }
  .btn-menu{
    border-radius: 0rem;
  }
  .page-item.active .page-link{
    background-color: #004997;
    border-color: #004997;
  }
  .page-link{
    color: #004997;
  }
  .header-nav-cl {
    background-color: #004997;
    padding: 0px;
  }
</style>
<style>
  #headerNav.navbar-dark .navbar-nav .nav-link{
    color: rgba(255, 255, 255, 1);
  }
  #headerNav.header-nav-cl .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus{
    color: rgba(255, 255, 255, 1);
  }
  #headerNav .dropdown-menu{
    background-color: #004997;
  }
  #headerNav .dropdown-item{
    color:white;
  }
  #headerNav .dropdown-item.active,#headerNav .dropdown-item:active{
    background-color: rgba(0, 123, 255, 0.5);
    color: white;
  }
  #headerNav .dropdown-item:hover, .dropdown-item:focus{
    background-color: rgba(255, 255, 255, 0.3);
    color: black;
  }
</style>

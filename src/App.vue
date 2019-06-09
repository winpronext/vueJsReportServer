<template>
  <div id="app" class="container">
    <headerNav v-if="this.$route.path != '/auth'"></headerNav>
    <br>
    <transition :name="transition" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <preloader></preloader>
  </div>
</template>

<script>
import headerNav from './components/headerNav'
import preloader from './components/preloader'
export default {
  name: 'App',
  components: {
    'headerNav': headerNav,
    'preloader': preloader
  },
  data: function () {
    return {
      transition: 'slide-left'
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <v-app>
    <NavBar/>
    <v-content width="90%" centered>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
    components: {
    NavBar
  },
}
</script>

<style>

</style>
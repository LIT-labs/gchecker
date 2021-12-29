<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
  import ConfigService from './services/config.service'

  export default {
    name: 'App',
    beforeCreate () {
      ConfigService.loadConfig()
    },
  }
</script>

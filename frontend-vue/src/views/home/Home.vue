<template>
  <v-app>
    <!--<home-system-bar />-->

    <home-app-bar />

    <home-view />

    <home-footer />
    <!-- <home-settings />-->
  </v-app>
</template>

<script>
  export default {
    name: 'Start',

    components: {
      HomeAppBar: () => import('./AppBar'),
      HomeFooter: () => import('./Footer'),
      HomeView: () => import('./View'),
    },
  }
</script>

<template>
  <v-container>
    <v-card color="basil">
      <v-card-title class="text-center text-h3 justify-center py-6">
        {{ gcheckername }}
      </v-card-title>

      <v-tabs
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab> G-checkte</v-tab>
        <v-tab> Un g-checkte</v-tab>

        <v-tab-item>
          <table-checked :data="checked" />
        </v-tab-item>
        <v-tab-item>
          <table-unchecked :data="unchecked" />
        </v-tab-item>
      </v-tabs>
    </v-card>

    <login-dialog :open="isLoginDialogOpen" />
  </v-container>
</template>

<script>
  import TableChecked from '../../components/TableChecked.vue'
  import TableUnchecked from '../../components/TableUnchecked.vue'
  import LoginDialog from '../../components/LoginDialog.vue'
  import ExamineeService from '../../services/examinee.service'
  import BubbleService from '../../services/bubble.service'
  import configService from '../../services/config.service'

  export default {
    name: 'Dashboard',
    components: { LoginDialog, TableChecked, TableUnchecked },
    data: () => ({
      isLoginDialogOpen: false,
      unchecked: [],
      checked: [],
    }),
    computed: {
      loggedIn () {
        return this.$store.state.auth.status.loggedIn
      },
      gcheckername () {
        return this.$route.params.bubbleName
      },
    },
    created () {
      if (!this.loggedIn) {
        this.showLoginDialog()
      } else {
        if (
          this.$store.state.config &&
          Object.keys(this.$store.state.config).length === 0 &&
          Object.getPrototypeOf(this.$store.state.config) === Object.prototype
        ) {
          configService.loadConfig().then(data => {
            this.loadData()
          })
        } else {
          this.loadData()
        }
      }
    },
    methods: {
      showLoginDialog () {
        this.isLoginDialogOpen = true
      },
      loadData () {
        BubbleService.getCategories()
          .then(response => {
            this.$store.dispatch('setCategories', response.data.data)
          })
          .catch(e => {
            console.log(e)
          })
        BubbleService.getUsers()
          .then(data => {
            this.$store.dispatch('setUsers', data.data)
          })
          .catch(e => {
            console.log(e)
          })

        ExamineeService.getChecked()
          .then(response => {
            this.$store.dispatch('setChecked', response.data)
          })
          .catch(e => {
            console.log(e)
          })
        ExamineeService.getUnchecked()
          .then(response => {
            this.$store.dispatch('setUnchecked', response.data)
          })
          .catch(e => {
            console.log(e)
          })
      },
    },
  }
</script>

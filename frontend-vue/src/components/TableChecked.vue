<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="checked_at"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <table-dialog ref="dialogs" />
      </v-toolbar>
    </template>
    <template #[`item.check`]="{ item }">
      <v-btn
        small
        color="primary"
        @click="openCheckDialog(item)"
      >
        prüfen
      </v-btn>
    </template>
    <template #[`item.category`]="{ item }">
      <v-chip
        :color="resolveCategoryColor(item.category)"
        dark
      >
        {{ item.category }}
      </v-chip>
    </template>
    <template #[`item.checked_at`]="{ item }">
      {{ moment(item.checked_at).format('DD.MM.YYYY') }}
    </template>
    <template #[`item.valid_till`]="{ item }">
      {{ moment(item.valid_till).format('DD.MM.YYYY') }}
    </template>
    <template #[`item.checked_from`]="{ item }">
      {{ resolveUserName(item) }}
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="openEditDialog(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="red"
        @click="openDeleteDialog(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  import moment from 'moment'
  import TableDialog from './TableDialog.vue'
  export default {
    components: { TableDialog },
    data: () => ({
      currentItemIndex: -1,
      currentItem: {},
      useAdd: false,
    }),
    computed: {
      headers () {
        return this.$store.state.headersChecked
      },
      loggedIn () {
        return this.$store.state.auth.status.loggedIn
      },
      data: {
        get () {
          return this.$store.state.checked
        },
        set (newValue) {
          return this.$store.dispatch('setChecked', newValue)
        },
      },
    },
    methods: {
      openCheckDialog (item) {
        this.currentItem.index = this.data.indexOf(item)
        this.currentItem.item = Object.assign({}, item)
        this.currentItem.item.checked_at = moment().format('YYYY-MM-DD')
        this.$refs.dialogs.openCheck(this.currentItem)
      },

      openEditDialog (item) {
        this.currentItem.index = this.data.indexOf(item)
        this.currentItem.item = Object.assign({}, item)
        this.$refs.dialogs.openEdit(this.currentItem)
      },
      openDeleteDialog (item) {
        this.currentItem.index = this.data.indexOf(item)
        this.currentItem.item = Object.assign({}, item)
        this.$refs.dialogs.openDelete(this.currentItem)
      },
      resolveCategoryColor (category) {
        const needle = this.$store.state.categories.find(element => {
          if (!element.text) {
            return false
          } else {
            return element.text === category
          }
        })
        return needle.color
      },
      resolveUserName (userID) {
        const needle = this.$store.state.users.find(element => {
          return element.id === userID.checked_from
        })
        if (typeof needle === 'undefined') return ''
        return needle.name
      },
    },
  }
</script>

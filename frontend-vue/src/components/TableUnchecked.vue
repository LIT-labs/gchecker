<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-spacer />
        <table-dialog
          ref="dialogs"
          :item="currentItem"
          :checked="false"
        />
      </v-toolbar>
    </template>
    <template #[`item.category`]="{ item }">
      <v-chip
        :color="resolveCategoryColor(item.category)"
        dark
      >
        {{ item.category }}
      </v-chip>
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
    }),
    computed: {
      headers () {
        return this.$store.state.headersUnchecked
      },

      loggedIn () {
        return this.$store.state.auth.status.loggedIn
      },
      data: {
        get () {
          return this.$store.state.unchecked
        },
        set (newValue) {
          return this.$store.dispatch('setUnchecked', newValue)
        },
      },
      checkIsValid: {
        get () {
          if (this.currentItem.valid_till) {
            return this.currentItem.valid_till.length !== 0
          }
          return false
        },
        set (val) {},
      },
    },

    methods: {
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
    },
  }
</script>

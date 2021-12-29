<template>
  <v-combobox
    v-model="model"
    :v-if="renderComponent"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="Search for an option"
    small-chips
    solo
  >
    <template #no-data>
      <v-list-item>
        <span class="subheading">Enter drücken um </span>
        <v-chip
          :color="`${colors[nonce - 1]} `"
          label
          small
        >
          {{ search }}
        </v-chip>
        zu erstellen
      </v-list-item>
    </template>
    // eslint-disable-next-line vue/no-unused-vars
    <template #selection="{ attrs, item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        v-bind="attrs"
        :color="`${item.color} `"
        :input-value="selected"
        label
        small
      >
        <span class="pr-2">
          {{ item.text }}
        </span>
      </v-chip>
    </template>
    <template #item="{ index, item }">
      <v-text-field
        v-if="editing === item"
        v-model="editing.text"
        autofocus
        flat
        background-color="transparent"
        hide-details
        solo
        @keyup.enter="edit(index, item)"
      />
      <v-chip
        v-else
        :color="`${item.color}`"
        dark
        label
        small
      >
        {{ item.text }}
      </v-chip>
      <v-spacer />
      <v-list-item-action @click.stop>
        <v-btn
          icon
          @click.stop.prevent="edit(index, item)"
        >
          <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-combobox>
</template>
<script>
  export default {
    props: { value: { type: String, default: 'Mitarbeiter' } },
    data: () => ({
      renderComponent: true,
      activator: null,
      attach: null,
      editing: null,
      editingIndex: -1,
      nonce: 1,
      menu: false,
      x: 0,
      search: null,
      y: 0,
    }),
    computed: {
      colors () {
        return this.$store.state.categoryColors
      },
      model: {
        get () {
          const result = this.items.filter(element => {
            if (typeof element.text !== 'undefined') {
              return this.value === element.text
            } else {
              return false
            }
          })
          return result[0]
        },
        set (value) {
          if (value === null) return ''

          let text = value

          if (value.text) text = value.text
          this.$emit('input', text)
          const isNew =
            this.items.filter(element => {
              if (element.text) {
                return element.text === text
              }
              return false
            }).length === 0
          if (isNew) {
            const temp = this.items
            temp.push({
              text: text,
              color: this.colors[(this.items.length - 1) % this.colors.length],
            })
            this.items = temp
          }
          return text
        },
      },
      items: {
        get () {
          return this.$store.state.categories
        },
        set (newValue) {
          return this.$store.dispatch('setCategories', newValue)
        },
      },
    },

    methods: {
      forceRerender () {
        // Remove my-component from the DOM
        this.renderComponent = false

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true
        })
      },
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => (val != null ? val : '')

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
    },
  }
</script>

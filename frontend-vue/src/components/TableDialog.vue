<template>
  <div>
    <v-dialog
      v-if="!checked"
      v-model="isOpenAdd"
      max-width="500px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="my-16"
          v-bind="attrs"
          x-large
          v-on="on"
        >
          Hinzufügen
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Neue Person anlegen</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form v-model="valid">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="currentItem.firstname"
                    label="Vorname"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="currentItem.lastname"
                    :rules="[rules.required]"
                    label="Nachname"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <category-chooser v-model="currentItem.category" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="closeAdd"
          >
            Abbruch
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            :disabled="!valid"
            @click="addItemConfirm"
          >
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isOpenEdit"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Person bearbeiten</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="valid">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="currentItem.firstname"
                    label="Vorname"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="currentItem.lastname"
                    :rules="[rules.required]"
                    label="Nachname"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <category-chooser v-model="currentItem.category" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="closeEdit"
          >
            Abbruch
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            :disabled="!valid"
            @click="editItemConfirm"
          >
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isOpenDelete"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          Sind Sie sicher, dass sie diese Person löschen wollen?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="closeDelete"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteItemConfirm"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isOpenCheck"
      max-width="500px"
    >
      <v-card>
        <v-form v-model="checkIsValid">
          <v-card-title class="text-h5">
            Nachweis für Person hinzufügen:
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-menu
                v-model="checkedAtDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="currentItem.checked_at"
                    label="Geprüft am:"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    required
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="currentItem.checked_at"
                  @input="checkedAtDatePicker = false"
                />
              </v-menu>
            </v-row>
            <v-row>
              <v-menu
                v-model="validTillDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="currentItem.valid_till"
                    label="Gültig bis:"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="currentItem.valid_till"
                  :min="today"
                  @input="validTillDatePicker = false"
                />
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="red darken-1"
              text
              @click="closeCheck"
            >
              Abbrechen
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :disabled="!checkIsValid"
              @click="checkItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import CategoryChooser from './CategoryChooser.vue'
  export default {
    components: { CategoryChooser },
    props: { checked: { type: Boolean, default: true } },
    data: () => ({
      rules: {
        required: value => !!value || 'Notwendiges Feld.',
      },
      valid: false,
      isOpenAdd: false,
      isOpenEdit: false,
      isOpenDelete: false,
      isOpenCheck: false,
      checkedAtDatePicker: false,
      validTillDatePicker: false,
      currentItem: {},
      currentItemIndex: -1,
      today: moment().format('YYYY-MM-DD'),
    }),
    computed: {
      type () {
        return this.checked ? 'Checked' : 'Unchecked'
      },
      defaultItem () {
        return this.$store.state.defaultItem
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
          return this.$store.dispatch('set' + this.type, newValue)
        },
      },
    },

    watch: {
      isOpenAdd (val) {
        if (val) this.openDialogEdit()
        val || this.closeAdd()
      },
      isOpenEdit (val) {
        val || this.closeEdit()
      },
      isOpenDelete (val) {
        val || this.closeDelete()
      },
      isOpenCheck (val) {
        val || this.closeCheck()
      },
    },

    methods: {
      openCheck (item) {
        this.currentItem = item.item
        if (this.currentItem.valid_till != null) {
          this.currentItem.valid_till = moment(this.currentItem.valid_till).format('YYYY-MM-DD')
        }
        this.currentItemIndex = item.index
        this.isOpenCheck = true
      },
      openEdit (item) {
        this.currentItem = item.item
        this.currentItemIndex = item.index
        this.isOpenEdit = true
      },
      openDelete (item) {
        this.currentItem = item.item
        this.currentItemIndex = item.index
        this.isOpenDelete = true
      },
      addItemConfirm () {
        this.$store.dispatch('add' + this.type, this.currentItem)
        this.closeAdd()
      },

      deleteItemConfirm () {
        this.$store.dispatch('delete' + this.type, { item: this.currentItem, index: this.currentItemIndex })
        this.closeDelete()
      },
      checkItemConfirm () {
        this.currentItem.checked_from = this.$store.state.auth.user.userId
        if (this.checked) {
          this.$store.dispatch('recheck', { item: this.currentItem, index: this.currentItemIndex })
        } else {
          this.$store.dispatch('moveToChecked', { item: this.currentItem, index: this.currentItemIndex })
        }
        this.closeCheck()
      },
      editItemConfirm () {
        this.$store.dispatch('update' + this.type, { index: this.currentItemIndex, item: this.currentItem })
        this.closeEdit()
      },
      openDialogEdit () {
        this.currentItem = Object.assign({}, this.defaultItem)
      },
      closeAdd () {
        this.isOpenAdd = false
        this.resetCurrentItem()
      },
      closeCheck () {
        this.validTillDatePicker = false
        this.checkAtMenu = false
        this.isOpenCheck = false
        this.resetCurrentItem()
      },
      closeEdit () {
        this.isOpenEdit = false
        this.resetCurrentItem()
      },
      closeDelete () {
        this.isOpenDelete = false
        this.resetCurrentItem()
      },
      resetCurrentItem () {
        this.$nextTick(() => {
          this.currentItem = Object.assign({}, this.defaultItem)
          this.currentItemIndex = -1
        })
      },
    },
  }
</script>

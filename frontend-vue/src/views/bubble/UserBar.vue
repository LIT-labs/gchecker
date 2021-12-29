<template>
  <v-responsive>
    <v-row>
      <v-col cols="1">
        Du bist
      </v-col>
      <v-col cols="2">
        <v-combobox
          v-model="selectedUser"
          :items="users"
          label="Name"
          @change="onPersonChoose"
        >
          <template #append-item>
            <v-list-item>
              <v-btn
                icon
                @click="openDialog"
              >
                <v-icon> mdi-plus </v-icon>
              </v-btn>
            </v-list-item>
          </template>
        </v-combobox>
      </v-col>
    </v-row>

    <add-user-dialog
      ref="addUserDialogUserBar"
      :taken-names="users"
      :calendar-i-d="calendarID"
      @addUser="addUser"
    />
  </v-responsive>
</template>

<script>
  import AddUserDialog from '../../components/AddUserDialog.vue'
  import CalendarDataService from '../../services/bubble.service'

  export default {
    name: 'UserBar',
    components: { AddUserDialog },
    props: {
      calendarID: { type: Number, default: -1 },
    },
    data: () => ({
      selectedUser: '',
      users: [],
      valid: false,
    }),
    created () {
      const currentUser = JSON.parse(this.$cookie.get('orgalendarUser'))

      if (currentUser !== null) {
        this.selectedUser = currentUser.name
      } else {
        this.$router.push({
          name: 'choose',
          params: { slug: this.$route.params.slug },
        })
      }
      if (typeof this.calendarID !== 'undefined') {
        this.updateUsers()
      }
    },
    methods: {
      addUser (newUser) {
        this.users.push(newUser)
      },
      openDialog () {
        this.$refs.addUserDialogUserBar.open()
      },
      onPersonChoose (value) {
        const data = {
          name: value,
          slug: this.$route.params.slug,
        }
        this.selectedUser = value
        this.$cookie.set('orgalendarUser', JSON.stringify(data), '90')
      },
      updateUsers () {
        CalendarDataService.getCalendarUsers(this.calendarID)
          .then(response => {
            this.users = []
            response.data.forEach(element => {
              this.users.push(element.name)
            })
          })
          .catch(e => {
            console.log(e)
          })
      },
    },
  }
</script>

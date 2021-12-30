<template>
  <v-container>
    <v-card>
      <v-card-title class="">
        <h1 class="text-center justify-center py-6 font-weight-bold text-h2 basil--text">
          Neuen gchecker erstellen:
        </h1>
      </v-card-title>
      <v-card-subtitle class="text-h5">
        Wir brauchen ein paar Infos von dir um deinen eigenen gchecker erstellen zu können!
      </v-card-subtitle>
      <p class="red--text pl-8">
        Achtung: Aktuell ist diese eine beta-version. Benutzung auf eigene Gefahr. Feedback, Infos, Bugs an
        manu@lit.labs.de
      </p>
      <v-card-text>
        <create-bubble-form
          :taken-names="takenNames"
          @OnChange="onChange"
        />
      </v-card-text>
      <v-card-actions>
        <notification-text
          ref="notfication"
          :text="notificationText"
          :state="notificationState"
        />
        <v-spacer />
        <v-btn
          :disabled="!valid"
          color="primary"
          :loading="inProcess"
          @click="createNew"
        >
          Erstellen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import CreateBubbleForm from '../../components/CreateBubbleForm.vue'
  import NotificationText from '../../components/Notificationtext.vue'

  export default {
    name: 'New',
    components: { CreateBubbleForm, NotificationText },
    data () {
      return {
        valid: false,
        notificationText: '',
        notificationState: 'ok',
        inProcess: false,
        takenNames: [],
      }
    },
    mounted () {
      const self = this
      window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && self.valid === true) {
          self.createNew()
        }
      })
    },
    methods: {
      onChange (valid, email, name, bubbleName) {
        this.valid = valid
        this.name = name
        this.email = email
        this.bubbleName = bubbleName
      },
      createNew () {
        this.inProcess = true
        var newBubbleData = {
          name: this.name,
          email: this.email,
          bubbleName: this.bubbleName,
        }
        console.log(newBubbleData)
        this.$store
          .dispatch('auth/create', newBubbleData)
          .then(response => {
            console.log(response)
            this.inProcess = false
            this.$router.push({
              name: 'dashboard',
              params: {
                bubbleName: response.bubbleName,
                slug: response.slug,
              },
            })
          })
          .catch(e => {
            this.inProcess = false
            this.$refs.notfication.showNotification(e.message, 'error')
          })
      },
    },
  }
</script>

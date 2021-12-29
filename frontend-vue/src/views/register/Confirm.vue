<template>
  <v-container>
    <v-card>
      <v-card-title> Bitte erstelle ein sicheres Passwort </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="password1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Bitte gebe ein sicheres Passwort ein."
            hint="Mindestens 8 Zeichen. Davon 1 Sonderzeichen und 1 Zahl"
            counter
            @click:append="show1 = !show1"
          />

          <v-text-field
            v-model="password2"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            name="input-10-1"
            label="Bitte wiederhole dein Passwort"
            :type="show1 ? 'text' : 'password'"
            counter
            @click:append="show1 = !show1"
          />
          <v-row />
        </v-form>
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
          color="green darken-1"
          text
          :loading="inProcess"
          @click="savePassword"
        >
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import NotificationText from '../../components/Notificationtext.vue'
  export default {
    name: 'Confirm',
    components: { NotificationText },
    data () {
      return {
        notificationText: '',
        notificationState: 'ok',
        inProcess: false,
        valid: false,
        show1: false,
        slug: '',
        bubbleName: '',
        password1: '',
        password2: '',
        rules: {
          required: value => !!value || 'Notwendiges Feld.',
          min: v => v.length >= 8 || 'Mindestens 8 Zeichen.',
          hasNumber: v => /\d/.test(v) || 'Mindestens 1 Nummer.',
          hasSign: v => /[!@#$%^&*]/.test(v) || 'Mindestens 1 Zeichen (!@#$%^&*).',
          notTheSame: v => this.password1 === this.password2 || 'Die Passwörter stimmen nicht über ein.',
        },
      }
    },
    watch: {
      showNotification (value) {
        if (value) this.startTimer()
      },
    },
    mounted () {
      const self = this
      window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && self.valid === true) {
          self.savePassword()
        }
      })
    },
    created () {},
    methods: {
      savePassword () {
        this.inProcess = true
        this.$store
          .dispatch('auth/confirmPasswordAndLogin', { token: this.$route.query.key, password: this.password1 })
          .then(response => {
            this.inProcess = false
            switch (response.status) {
              case 200: {
                this.slug = response.data.slug
                this.bubbleName = response.data.bubbleName
                this.$refs.notfication.showNotification(response.data.message, 'ok')
                setTimeout(() => this.toDashboard(), 2000)
                break
              }
              case 201:
                this.$refs.notfication.showNotification(response.data.message, 'warning')
                break
              case 202:
                this.$refs.notfication.showNotification(response.data.message, 'error')
                break
            }
          })
          .catch(e => {
            this.inProcess = false
            this.$refs.notfication.showNotification(e.respsonse.data.message, 'error')
          })
      },
      startTimer () {},
      toDashboard () {
        this.$router.push({
          name: 'dashboard',
          params: {
            bubbleName: this.bubbleName,
            slug: this.slug,
          },
        })
      },
    },
  }
</script>

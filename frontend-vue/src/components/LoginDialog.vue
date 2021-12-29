<template>
  <v-dialog
    v-model="isLoginDialogOpen"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Einloggen
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-text-field
              v-model="user"
              :rules="[rules.required]"
              label="Name"
              required
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Passwort"
              required
              @click:append="showPassword = !showPassword"
            />
          </v-row>
          <v-row>
            <notification-text
              ref="notfication"
              :text="notificationText"
              :state="notificationState"
            /> <v-spacer />
            <v-btn
              :disabled="!valid"
              color="green darken-1"
              text
              :loading="loginInProcess"
              @click="login"
            >
              Login
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-dialog>
</template>

<script>
  import NotificationText from '../components/Notificationtext.vue'

  export default {
    name: 'LoginDialog',
    components: { NotificationText },
    props: {
      open: { type: Boolean, default: false },
    },
    data () {
      return {
        valid: false,
        showNotification: false,
        notificationText: '',
        notificationState: 'ok',
        loginInProcess: false,
        user: '',
        password: '',
        showPassword: false,
        rules: {
          required: value => !!value || 'Notwendiges Feld.',
        },
      }
    },
    computed: {
      isLoginDialogOpen: {
        get () {
          return this.open
        },
        set (value) {},
      },
    },
    mounted () {
      const self = this
      window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && self.valid === true) {
          self.login()
        }
      })
    },
    methods: {
      login () {
        this.loginInProcess = true
        const credentials = {
          bubbleName: this.$route.params.bubbleName,
          slug: this.$route.params.slug,
          user: this.user,
          password: this.password,
        }

        this.$store
          .dispatch('auth/login', credentials)
          .then(resp => {
            this.loginInProcess = false
            if (resp.status === 200) {
              if (this.$route.params.slug === resp.data.slug && this.$route.params.bubbleName === resp.data.bubbleName) {
                this.$router.go()
              } else {
                this.$router.push({
                  name: 'dashboard',
                  params: {
                    bubbleName: resp.data.bubble.name,
                    slug: resp.data.bubble.slug,
                  },
                })
              }
            }
            if (resp.status === 201) {
              this.$refs.notfication.showNotification(resp.data.message, 'warning')
            }
            if (resp.status === 400) {
              this.$refs.notfication.showNotification(resp.data.message, 'error')
            }
          })
          .catch(e => {
            this.loginInProcess = false
            console.log(e)
          })
      },
    },
  }
</script>

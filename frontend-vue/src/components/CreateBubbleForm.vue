<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <v-text-field
          v-model="bubbleName"
          :rules="bubbleNameRules"
          label="Gib deinem gchecker einen Namen"
          required
          @input="onBubbleNameChange"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Gib dir einen Namen"
          required
          @input="onNameChange"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Wir brauchen deine E-mail um dich erreichen zu können"
          required
          @input="onEmailChange"
        />
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: 'CreateBubbleForm',
    props: {
      calendarID: { type: Number, default: -1 },
      takenNames: {
        type: Array,
        default: function () {
          return ['']
        },
      },
    },
    data () {
      return {
        valid: false,
        name: '',
        bubbleName: '',
        email: '',
        nameAvailable: true,
        nameRules: [
          v => !!v || 'Du brauchst einen Namen!',
          v => this.nameAvailable || 'Dieser Name ist bereits vergeben! Wähle doch bitte einen anderen.',
        ],
        bubbleNameRules: [v => !!v || 'Dein gchecker brauch einen Namen!'],
        emailRules: [
          v => !!v || 'Eine E-mail ist notwendig',
          v =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
              v,
            ) || 'Die E-mail muss gültig sein',
        ],
      }
    },

    methods: {
      onNameChange (name) {
        const foundName = this.takenNames.filter(function (entry) {
          return entry === name
        })
        this.nameAvailable = foundName.length === 0

        this.$emit('OnChange', this.valid, this.email, this.name, this.bubbleName)
      },
      onBubbleNameChange () {
        this.$emit('OnChange', this.valid, this.email, this.name, this.bubbleName)
      },

      onEmailChange () {
        this.$emit('OnChange', this.valid, this.email, this.name, this.bubbleName)
      },
    },
  }
</script>

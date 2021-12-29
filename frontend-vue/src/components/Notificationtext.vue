<template>
  <div
    v-if="show"
    :style="{ color: notColor }"
  >
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'NotificationText',
    props: {
      statecolors: {
        type: Array,
        default: () => [
          { key: 'ok', value: 'green' },
          { key: 'warning', value: 'orange' },
          { key: 'error', value: 'red' },
        ],
      },
    },
    data () {
      return {
        show: false,
        message: '',
        state: '',
        notColor: 'green',
      }
    },
    computed: {},

    methods: {
      showNotification (message, state) {
        this.startTimer()
        this.message = message
        this.state = state
        this.notColor = this.getStateColor(state)
      },
      startTimer () {
        this.show = true
        setTimeout(() => this.stopTimer(), 2500)
      },
      stopTimer () {
        this.show = false
      },
      getStateColor (state) {
        let result = 'green'
        this.statecolors.forEach(element => {
          if (element.key === state) {
            result = element.value
          }
        })
        return result
      },
    },
  }
</script>

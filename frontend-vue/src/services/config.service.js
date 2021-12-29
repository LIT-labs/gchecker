import axios from 'axios'
import * as vueConfig from '../../vue.config'

import store from '../store/index'
class ConfigService {
  async loadConfig () {
    return axios
      .get(`${vueConfig.publicPath}static/config.json`)
      .then(response => {
        store.dispatch('setConfig', response.data)
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  set (key, value) {
    // store.state.config[key] = value
  }

  get (key) {
    return window.App.$store.getters.config[key]
  }

  getApiUrl () {
    if (this.get('apiUrl')) {
      return this.get('apiUrl')
    }
    console.log('NO API URL IN CONFIG')

    return 'http://gchecker.de/api'
  }
}

export default new ConfigService()

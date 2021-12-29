import http from './http-common'
import ConfigService from './config.service'
import authHeader from './auth-header'
import axios from 'axios'

class BubbleService {
  getCategories () {
    return http.get(`${ConfigService.getApiUrl()}/bubble/categories`, { headers: authHeader() })
  }

  getUsers () {
    return http.get(`${ConfigService.getApiUrl()}/bubble/users`, { headers: authHeader() })
  }

  setCategories (categories) {
    return http.post(`${ConfigService.getApiUrl()}/bubble/categories`, categories, { headers: authHeader() })
  }
}

export default new BubbleService()

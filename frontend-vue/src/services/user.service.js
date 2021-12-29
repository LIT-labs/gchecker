import http from './http-common'
import ConfigService from './config.service'

class UserService {
  update (id, data) {
    return http.put(`${ConfigService.getApiUrl()}/bubble/${id}`, data)
  }
}

export default new UserService()

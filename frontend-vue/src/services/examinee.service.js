import http from './http-common'
import ConfigService from './config.service'
import authHeader from './auth-header'

class ExamineeService {
  getChecked () {
    return http.get(`${ConfigService.getApiUrl()}/examinee/checked/all`, { headers: authHeader() })
  }

  setChecked (data) {
    return http.post(`${ConfigService.getApiUrl()}/examinee/checked/all`, data, { headers: authHeader() })
  }

  addChecked (data) {
    return http.post(`${ConfigService.getApiUrl()}/examinee/checked`, data, { headers: authHeader() })
  }

  addUnchecked (data) {
    return http.post(`${ConfigService.getApiUrl()}/examinee/unchecked`, data, { headers: authHeader() })
  }

  update (data) {
    return http.put(`${ConfigService.getApiUrl()}/examinee/${data.id}`, data, { headers: authHeader() })
  }

  delete (id) {
    return http.delete(`${ConfigService.getApiUrl()}/examinee/${id}`, { headers: authHeader() })
  }

  getUnchecked () {
    return http.get(`${ConfigService.getApiUrl()}/examinee/unchecked/all`, { headers: authHeader() })
  }

  setUnchecked (data) {
    return http.post(`${ConfigService.getApiUrl()}/examinee/unchecked/all`, data, { headers: authHeader() })
  }
}

export default new ExamineeService()

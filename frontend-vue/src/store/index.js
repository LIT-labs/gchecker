import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import BubbleService from '../services/bubble.service'
import ExamineeService from '../services/examinee.service'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    config: {},
    categories: [],
    users: [],
    categoryColors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    unchecked: [],
    checked: [],
    defaultItem: {
      firstname: 'Impfen',
      lastname: 'Hilft',
      category: 'Mitarbeiter',
      checked_at: '',
      valid_till: null,
      checked_from: '',
      status: 'ungeprüft',
    },
    headersUnchecked: [
      { text: 'Prüfen', value: 'check', sortable: false },
      {
        text: 'Name',
        align: 'start',
        value: 'firstname',
      },
      {
        text: 'Nachname',
        align: 'start',
        value: 'lastname',
      },
      { text: 'Kategorie', value: 'category' },
      { text: 'Aktionen', value: 'actions', sortable: false },
    ],
    headersChecked: [
      { text: 'Erneut Prüfen', value: 'check', sortable: false },
      {
        text: 'Name',
        align: 'start',
        value: 'firstname',
      },
      {
        text: 'Nachname',
        align: 'start',
        value: 'lastname',
      },
      { text: 'Kategorie', value: 'category' },
      { text: 'Geprüft am', value: 'checked_at' },
      { text: 'Gültig bis', value: 'valid_till' },
      { text: 'Geprüft von', value: 'checked_from' },

      { text: 'Aktionen', value: 'actions', sortable: false },
    ],
  },
  getters: {
    config (state) {
      return state.config
    },
    users: state => {
      return state.users
    },
    categories: state => {
      return state.categories
    },
    checked: state => {
      return state.checked
    },
    unchecked: state => {
      return state.unchecked
    },
    getCategoryColor: state => color => {
      return state.categories.find(element => element === color)
    },
  },
  mutations: {
    setConfig: (state, data) => {
      state.config = data
    },
    moveToChecked: (state, newItem) => {
      state.unchecked.splice(newItem.index, 1)
      newItem.item.status = 'geprüft'
      state.checked.push(newItem.item)
      ExamineeService.update(newItem.item)
        .then(data => {})
        .catch(e => {
          console.log(e)
        })
    },

    setUsers: (state, data) => {
      state.users = data
    },
    setCategories: (state, newValue) => {
      const data = {
        data: newValue,
      }
      BubbleService.setCategories(data)
        .then(data => {})
        .catch(e => {
          console.log(e)
        })
      state.categories = newValue
    },
    addChecked: (state, newItem) => {
      ExamineeService.addChecked(newItem)
        .then(response => {
          newItem.id = response.data.id
          state.checked.push(newItem)
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateChecked: (state, newItem) => {
      Object.assign(state.checked[newItem.index], newItem.item)
      ExamineeService.update(newItem.item)
        .then(data => {})
        .catch(e => {
          console.log(e)
        })
    },
    deleteChecked: (state, newItem) => {
      state.checked.splice(newItem.index, 1)
      ExamineeService.delete(newItem.item.id)
        .then(data => {})
        .catch(e => {
          console.log(e)
        })
    },
    setChecked: (state, newItem) => {
      state.checked = newItem
    },
    addUnchecked: (state, newItem) => {
      ExamineeService.addUnchecked(newItem)
        .then(response => {
          newItem.id = response.data.id
          state.unchecked.push(newItem)
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateUnchecked: (state, newItem) => {
      Object.assign(state.unchecked[newItem.index], newItem.item)
      ExamineeService.update(newItem.item)
        .then(data => {})
        .catch(e => {
          console.log(e)
        })
    },
    deleteUnchecked: (state, newItem) => {
      state.unchecked.splice(newItem.index, 1)
      ExamineeService.delete(newItem.item.id)
        .then(data => {})
        .catch(e => {
          console.log(e)
        })
    },
    setUnchecked: (state, newItem) => {
      state.unchecked = newItem
    },

    // other mutations
  },
  actions: {
    setConfig: ({ commit, state }, value) => {
      commit('setConfig', value)
      return state.config
    },
    moveToChecked: ({ commit, state }, value) => {
      commit('moveToChecked', value)
      return state.checked
    },
    setCategories: ({ commit, state }, value) => {
      commit('setCategories', value)
      return state.categories
    },
    setUsers: ({ commit, state }, value) => {
      commit('setUsers', value)
      return state.users
    },
    setChecked: ({ commit, state }, value) => {
      commit('setChecked', value)
      return state.checked
    },
    addChecked: ({ commit, state }, value) => {
      commit('addChecked', value)
      return state.checked
    },
    updateChecked: ({ commit, state }, value) => {
      commit('updateChecked', value)
      return state.checked
    },
    deleteChecked: ({ commit, state }, value) => {
      commit('deleteChecked', value)
      return state.checked
    },
    setUnchecked: ({ commit, state }, value) => {
      commit('setUnchecked', value)
      return state.unchecked
    },
    addUnchecked: ({ commit, state }, value) => {
      commit('addUnchecked', value)
      return state.unchecked
    },
    updateUnchecked: ({ commit, state }, value) => {
      commit('updateUnchecked', value)
      return state.unchecked
    },
    deleteUnchecked: ({ commit, state }, value) => {
      commit('deleteUnchecked', value)
      return state.unchecked
    },
  },
})

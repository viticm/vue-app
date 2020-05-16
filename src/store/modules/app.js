import { storeGet, storeSet } from '@/utils/store'
import { getLanguage } from '@/lang/index'

const state = {
  sidebar: {
    opened: storeGet('sidebarStatus') ? !!+storeGet('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: storeGet('size') || 'medium',
  drawer: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      storeSet('sidebarStatus', 1)
    } else {
      storeSet('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    storeSet('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    // storeSet('vue-app-language', language)
    storeSet('VUE-APP-LANGUAGE', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    storeSet('size', size)
  },
  TOGGLE_DRAWER: (state, drawer) => {
    state.drawer = drawer
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  toggleDrawer({ commit }, flag) {
    commit('TOGGLE_DRAWER', flag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

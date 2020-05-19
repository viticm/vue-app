import { asyncRoutes, constantRoutes } from '@/router/routes'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param routes
 * @return array
 */
export function filterAsyncRoutes(asyncRoutes, routes) {
  const res = []
  asyncRoutes.forEach(route => {
    const tmp = { ...route }
    if (routes.includes(tmp.id)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, routes)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, routes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

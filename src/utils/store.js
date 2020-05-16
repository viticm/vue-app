/**
 * VUE APP ( https://github.com/viticm/vue-app )
 * $Id util.js
 * @link https://github.com/viticm/vue-app for the canonical source repository
 * @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 * @license
 * @user viticm( viticm.ti@gmail.com )
 * @date 2020/05/15 10:29
 * @uses store util functions
 */

import Cookies from 'js-cookie'

export function storeGet(name) {
  return localStorage ? localStorage.getItem(name) : Cookies.get(name)
}

export function storeSet(name, value) {
  localStorage ? localStorage.setItem(name, value) : Cookies.set(name, value)
}

export function storeRemove(name) {
  localStorage ? localStorage.removeItem(name) : Cookies.remove(name)
}

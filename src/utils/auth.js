import { storeGet, storeSet, storeRemove } from '@/utils/store'

const TokenKey = 'VUE-APP-TOKEN'

export function getToken() {
  return storeGet(TokenKey)
}

export function setToken(token) {
  return storeSet(TokenKey, token)
}

export function removeToken() {
  return storeRemove(TokenKey)
}

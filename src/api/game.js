import request from '@/utils/request'

export function fetchServerList(query) {
  return request({
    url: '/lumen-api/game/server/list',
    method: 'get',
    params: query
  })
}

export function fetchServerOptList(query) {
  return request({
    url: '/lumen-api/game/serveropt/list',
    method: 'get',
    params: query
  })
}

export function fetchServerOptExistsOne(key, value) {
  return request({
    url: '/lumen-api/game/serveropt/exists-one',
    method: 'get',
    params: { key, value }
  })
}

export function saveServer(data) {
  return request({
    url: `/lumen-api/game/server/save`,
    method: 'post',
    data
  })
}

export function fetchServer(id) {
  return request({
    url: '/lumen-api/game/server/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchServerOpt(id) {
  return request({
    url: '/lumen-api/game/serveropt/detail',
    method: 'get',
    params: { id }
  })
}

export function saveServerOpt(data) {
  return request({
    url: `/lumen-api/game/serveropt/save`,
    method: 'post',
    data
  })
}

export function deleteServer(id) {
  return request({
    url: `/lumen-api/game/server/delete/${id}`,
    method: 'delete'
  })
}

export function deleteServerOpt(id) {
  return request({
    url: `/lumen-api/game/serveropt/delete/${id}`,
    method: 'delete'
  })
}

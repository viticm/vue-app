import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/lumen-api/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/lumen-api/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/lumen-api/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/lumen-api/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/lumen-api/article/update',
    method: 'post',
    data
  })
}

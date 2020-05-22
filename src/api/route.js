import request from '@/utils/request'

export function getRouteList() {
  return request({
    url: '/lumen-api/route/table/list',
    method: 'get'
  })
}

export function saveRoute(data) {
  return request({
    url: '/lumen-api/route/table/save',
    method: 'post',
    data
  })
}

export function deleteRoute(id) {
  return request({
    url: `/lumen-api/route/table/delete/${id}`,
    method: 'delete'
  })
}


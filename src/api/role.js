import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/lumen-api/routelist',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/lumen-api/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/lumen-api/role',
    method: 'post',
    params: { data }
  })
}

export function updateRole(id, data) {
  return request({
    url: `/lumen-api/role/${id}`,
    method: 'put',
    params: { data }
  })
}

export function deleteRole(id) {
  return request({
    url: `/lumen-api/role/${id}`,
    method: 'delete'
  })
}

import request from '@/utils/request'

export function getTable() {
  return request({
    url: '/lumen-api/routetable',
    method: 'get'
  })
}


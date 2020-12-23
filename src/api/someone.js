import request from '@/utils/request'

export function saveSomeone(data) {
  return request({
    url: `/lumen-api/other/someone/save`,
    method: 'post',
    data
  })
}

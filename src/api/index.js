import request from '../utils/request'

export function getDynamic() {
  return request({
    url: '/total/findall',
    method: 'get'
  })
}

export function getMapData(data) {
  return request({
    url: '/metadata/findall',
    method: 'get',
    data
  })
}

export function getLineData(data) {
  return request({
    url: '/history/findall',
    method: 'get',
    data
  })
}

export function getTableDataO(data) {
  return request({
    url: '/metadata/findall',
    method: 'get',
    data
  })
}

export function getTableDataT(data) {
  return request({
    url: '/score/findall',
    method: 'get',
    data
  })
}

export function addDynamic(data) {
  return request({
    url: '/total/saveorupdate',
    method: 'post',
    data
  })
}
export function addTableDataO(data) {
  return request({
    url: '/metadata/saveorupdate',
    method: 'post',
    data
  })
}
export function addTableDataT(data) {
  return request({
    url: '/score/saveorupdate',
    method: 'post',
    data
  })
}

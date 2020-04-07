import request from '../utils/request'

export const getData = () => {
  return request.jsonp(
    'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'
  )
}

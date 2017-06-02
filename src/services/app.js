import request from '../utils/request'

export const login = values => {
  return request.post('/login', values)
}
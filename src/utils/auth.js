import Cookie from 'js-cookie'

export const getToken = () => {
  return Cookie.get('token')
}

export const removeToken = () => {
  Cookie.remove('token')
}

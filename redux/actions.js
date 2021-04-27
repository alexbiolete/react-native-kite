import * as t from './actionTypes'
import { dbApiUrl } from '../App/config'

const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  }
}

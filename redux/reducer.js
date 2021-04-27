import { initialState } from './initialState'
import * as t from './actionTypes'

const loginReducer = (state = initialState, aciton) => {
  switch (aciton.type) {
    case t.SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload,
        isLoggedin: true
      }
    default:
      return state
  }
}

export { loginReducer }

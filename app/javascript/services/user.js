import pollsRequest from '../apis/pollsRequest'

import { LOGIN_FAILURE, SINGUP_FAILURE, LOGIN, SINGUP, LOGOUT } from '../packs/constants'

const login = (dispatch, response) => {
  if (response.status === 200){
    window.localStorage.setItem('jwt', response.data.jwt)
    window.localStorage.setItem('user', JSON.stringify(response.data.user))

    dispatch({type: LOGIN, payload: response});
  }
  else {
    dispatch({type: LOGIN_FAILURE, payload: response.data.error});
  }
}

const logout = (dispatch) => {
  window.localStorage.removeItem('jwt');
  window.localStorage.removeItem('user');

  dispatch({type: LOGOUT});
}

const signup = (response, dispatch) => {
  if (response.status === 200){
    dispatch({type: SIGNIN_MODAL, payload: SIGNIN_MODAL});
  }
  else {
    dispatch({type: SIGNUP_FAILURE, payload: response.data.error});
  }
}

export const userService = {
    login,
    logout,
    signup
};
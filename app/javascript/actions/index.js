// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import pollsRequest from '../apis/pollsRequest'
import loadTranslations from '../i18n'

import { FETCH_POLLS, FETCH_USER_POLLS, FETCH_RESPONDED_POLLS,
         FETCH_CATEGORIES, BUILD_TRANSLATIONS, ANSWER_POLL,
         SEARCH_POLL, LOGIN, LOGOUT, SIGNUP, SIGNUP_MODAL, SIGNIN_MODAL,
         PROFILE_MODAL, SIGNUP_BUTTON, SIGNIN_BUTTON, PROFILE_BUTTON,
         LOGIN_FAILURE, SIGNUP_FAILURE, TOGGLE_LOADER
       } from '../packs/constants'

const handleUnauthorizedRequest = (response) => {
  if (response.status === 401){
    logout();
  }
}

export const fetchPolls = () => async dispatch => {
  const response = await pollsRequest.get('/polls');

  dispatch({type: FETCH_POLLS, payload: response})
}

export const fetchUserPolls = () => async dispatch => {
  const response = await pollsRequest.get('/user/polls');

  dispatch({type: FETCH_USER_POLLS, payload: response})
}

export const fetchRespondedPolls = () => async dispatch => {
  const response = await pollsRequest.get('/user/responded_polls');

  dispatch({type: FETCH_RESPONDED_POLLS, payload: response})
}

export const fetchCategories = () => async dispatch => {
  const response = await pollsRequest.get('/categories');

  dispatch({type: FETCH_CATEGORIES, payload: response})
}

export const buildTranslations = (locale = 'en') => ({
  type: BUILD_TRANSLATIONS,
  payload: loadTranslations(locale)
})

export const updateLocale = new_locale => async dispatch => {
  await pollsRequest.patch('/user/update_locale', {locale: new_locale});
}

export const answerPoll = (poll_id, option_id, callback) => async dispatch => {
  const url = "/polls/" + poll_id + "/" + option_id + "/answer"
  const response = await pollsRequest.post(url)

  dispatch({type: ANSWER_POLL, payload: response})
}

export const searchPoll = data => async dispatch => {
  const response = await pollsRequest.get('/polls/search', {params: data})

  dispatch({type: SEARCH_POLL, payload: response})
}

// pull login/signup and related things into separate service
export const login = data => async dispatch => {
  let response, error;
  try {
    response = await pollsRequest.post('/login', data);
  } catch (error) {
    response = error.response;
  }

  if (response.status === 200){
    window.localStorage.setItem('jwt', response.data.jwt)
    window.localStorage.setItem('user', JSON.stringify(response.data.user))

    dispatch({type: LOGIN, payload: response});
  }
  else {
    dispatch({type: LOGIN_FAILURE, payload: response.data.error});
  }
}

export const signup = data => async dispatch => {
  let response;
  try {
    response = await pollsRequest.post('/users', {user: data})
    console.log(response);
  } catch (error) {
    response = error.response;
  }

  if (response.status === 200){
    dispatch({type: SIGNIN_MODAL, payload: SIGNIN_MODAL});
  }
  else {
    dispatch({type: SIGNUP_FAILURE, payload: response.data.error});
  }

  // response = error.response;
  // console.log(userService)
  // userService.signup(response, dispatch);
  // const response = await pollsRequest.post('/users', data)

  // dispatch({type: SIGNUP, payload: response})
}

export const raiseModalError = (errror, modal) => {
  if(MODAL_ERRORS.includes(modal)){
    dispatch({type: modal, payload: error});
  }
  return
}

export const toggleLoader = show => ({
  type: TOGGLE_LOADER, payload: show
})

export const toggleSignUpModal = opened => ({
  type: SIGNUP_MODAL, payload: (opened ? SIGNUP_MODAL : null)
})
export const toggleSignInModal = opened => ({
  type: SIGNIN_MODAL, payload: (opened ? SIGNIN_MODAL : null)
})
export const toggleProfileModal = opened => ({
  type: PROFILE_MODAL, payload: (opened ? PROFILE_MODAL : null)
})

export const toggleSignUpButton = enabled => ({
  type: SIGNUP_BUTTON, payload: (enabled ? SIGNUP_BUTTON : null)
})
export const toggleSignInButton = enabled => ({
  type: SIGNIN_BUTTON, payload: (enabled ? SIGNIN_BUTTON : null)
})
export const toggleProfileButton = enabled => ({
  type: PROFILE_BUTTON, payload: (enabled ? PROFILE_BUTTON : null)
})

export const logout = () => {
  window.localStorage.removeItem('jwt')
  window.localStorage.removeItem('user')
  // document.location.href="/"
  return({type: LOGOUT})
}

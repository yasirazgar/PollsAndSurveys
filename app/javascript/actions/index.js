// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import pollsRequest from '../apis/pollsRequest'
import loadTranslations from '../i18n'

import { FETCH_POLLS, FETCH_USER_POLLS, FETCH_RESPONDED_POLLS,
         FETCH_CATEGORIES, BUILD_TRANSLATIONS, ANSWER_POLL,
         SEARCH_POLL, LOGIN, LOGOUT, SIGN_UP_MODAL, SIGN_IN_MODAL,
         PROFILE_MODAL, SIGN_UP_BUTTON, SIGN_IN_BUTTON, PROFILE_BUTTON
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

export const login = data => async dispatch => {
  const response = await pollsRequest.post('/login', {email: data.email, password: data.password})

  if (response.data.jwt){
    window.localStorage.setItem('jwt', response.data.jwt)
    window.localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  dispatch({type: LOGIN, payload: response})
}

export const toggleSignUpModal = opened => ({
  type: SIGN_UP_MODAL, payload: (opened ? SIGN_UP_MODAL : null)
})
export const toggleSignInModal = opened => ({
  type: SIGN_IN_MODAL, payload: (opened ? SIGN_IN_MODAL : null)
})
export const toggleProfileModal = opened => ({
  type: PROFILE_MODAL, payload: (opened ? PROFILE_MODAL : null)
})

export const toggleSignUpButton = enabled => ({
  type: SIGN_UP_BUTTON, payload: (enabled ? SIGN_UP_BUTTON : null)
})
export const toggleSignInButton = enabled => ({
  type: SIGN_IN_BUTTON, payload: (enabled ? SIGN_IN_BUTTON : null)
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

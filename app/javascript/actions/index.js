// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import pollsRequest from '../apis/pollsRequest'
import loadTranslations from '../i18n'

import { FETCH_POLLS, FETCH_USER_POLLS, FETCH_RESPONDED_POLLS,
         FETCH_CATEGORIES, BUILD_TRANSLATIONS, ANSWER_POLL,
         SEARCH_POLL
       } from '../packs/constants'

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

export const buildTranslations = (translation = 'en') => ({
  type: BUILD_TRANSLATIONS,
  payload: loadTranslations(translation)
})

export const answerPoll = (poll_id, option_id, callback) => async dispatch => {
  const url = "/polls/" + poll_id + "/" + option_id + "/answer"
  const response = await pollsRequest.post(url)

  dispatch({type: ANSWER_POLL, payload: response})
}

export const searchPoll = (data) => async dispatch => {
  const response = await pollsRequest.get('/polls/search', {params: data})

  dispatch({type: SEARCH_POLL, payload: response})
}

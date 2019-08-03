export const POLLS_TAB = 'polls'
export const USER_POLLS_TAB = 'user_polls'
export const RESPONDED_POLLS_TAB = 'user_responded_polls'
export const TAB_CLASS = 'tablinks'
export const TAB_ACTIVE_CLASS = 'tablinks active'
export const AGE_SELECT_OPTIONS = [[0, 'all'][1,'5-10'], [2,'11-17'], [3,'18-29'], [4,'30-40'], [5,'41-50'], [6,'50+']]
export const DEFAULT_LOCALE = 'en'
export const LANG_OPTIONS = [['en', 'English'], ['ta', 'தமிழ்']]
export const POLLS_MAP = {
        [POLLS_TAB]: 'polls',
        [USER_POLLS_TAB]: 'userPolls',
        [RESPONDED_POLLS_TAB]: 'respondedPolls'
      }
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const PASSWORD_REGEX = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"

// Actions - pull into separate file under constants
export const FETCH_POLLS = 'FETCH_POLLS'
export const FETCH_USER_POLLS = 'FETCH_USER_POLLS'
export const FETCH_RESPONDED_POLLS = 'FETCH_RESPONDED_POLLS'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const BUILD_TRANSLATIONS = 'BUILD_TRANSLATIONS'
export const ANSWER_POLL = 'ANSWER_POLL'
export const SEARCH_POLL = 'SEARCH_POLL'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const MODAL_ERRORS = [LOGIN_FAILURE, SIGNUP_FAILURE]

// export const UPDATE_LOCALE = 'UPDATE_LOCALE'
export const PROFILE_FORM = 'PROFILE_FORM'
export const SIGNIN_FORM = 'signin_form'
export const SIGNUP_FORM = 'signup_form'

export const PROFILE_MODAL = 'PROFILE_MODAL'
export const SIGNIN_MODAL = 'SIGNIN_MODAL'
export const SIGNUP_MODAL = 'SIGNUP_MODAL'
export const AVAILABLE_MODALS = [PROFILE_MODAL, SIGNIN_MODAL, SIGNUP_MODAL]

export const PROFILE_BUTTON = 'PROFILE_BUTTON'
export const SIGNIN_BUTTON = 'SIGNIN_BUTTON'
export const SIGNUP_BUTTON = 'SIGNUP_BUTTON'
export const AVAILABLE_BUTTONS = [PROFILE_BUTTON, SIGNIN_BUTTON, SIGNUP_BUTTON]


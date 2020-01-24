const dummyUser = {
  nickname: '김태은',
  Post: [],
  signUpData: {}
}

export const initialState = {
  isLoggedIn: false,
  user: null
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT = 'LOG_OUT'
export const SIGN_UP = 'SIGN_UP'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state
      }
    }
    case LOG_OUT: {
      return {
        ...state
      }
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer

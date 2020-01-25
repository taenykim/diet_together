export const initialState = {
  logInErrorReason: '',
  isSignedUp: false,
  signUpErrorReason: '',
  me: null, // 내 정보
  userInfo: null // 남의 정보
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInErrorReason: ''
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        me: action.data
      }
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInErrorReason: action.error,
        me: null
      }
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        me: null
      }
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        me: null
      }
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSignedUp: false,
        signUpErrorReason: ''
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignedUp: true
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpErrorReason: action.error
      }
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state
      }
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        me: action.data
      }
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state
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

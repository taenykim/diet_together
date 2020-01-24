export const initialState = {
  isLoggedIn: false,
  user: {
    nickname: '김태은',
    Post: []
  }
}

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state
      }
    }
    case LOG_OUT: {
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

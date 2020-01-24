export const initialState = {
  isLoggedIn: false,
  user: {}
}

const LOG_IN = 'LOG_IN'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
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

export const initialState = {
  logInLoading: false,
  logInError: null,
  logInDone: false,
  logOutLoading: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpDate: {},
  logInData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const logInRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export const logOutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}

export const signUpRequestAction = () => {
  return {
    type: SIGN_UP_REQUEST,
  }
}

const dummyUser = (data) => ({
  ...data,
  nickname: 'zerocho',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      }

    case LOG_IN_SUCCESS: //사가가 호출해주는 액션이라서 굳이 위에서 만들어줄 필요는 없음
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      }

    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      }

    case LOG_OUT_REQUEST:
      return {
        ...state,
        logInError: null,
        logInDone: false,
        logOutLoading: true,
      }

    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logInDone: false,
        logOutLoading: false,
        me: null,
      }

    case LOG_OUT_FAILURE:
      return {
        ...state,
        logInError: action.error,
        logOutLoading: false,
      }

    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpDone: false,
        signUpLoading: true,
        signUpError: null,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpDone: true,
        signUpLoading: false,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      }

    default:
      return state
  }
}

export default reducer

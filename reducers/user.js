import shortId from 'shortid'
import produce from 'immer'

export const initialState = {
  logInLoading: false, //로그인 시도중
  logInError: null,
  logInDone: false,
  logOutLoading: false, //로그아웃 시도중
  logOutError: null,
  logOutDone: false,
  signUpLoading: false, //회원가입 시도중
  signUpError: null,
  signUpDone: false,
  changeNicknameLoading: false, //닉네임 바꾸기 시도중
  changeNicknameError: null,
  changeNicknameDone: false,

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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME' //다른 리듀서 내부의 state를 바탕으로 이쪽 리듀서의 state를 변경하기 위한 액션
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME' //state를 바꾸는건 action이니까

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

export const changeNicknameRequestAction = (data) => {
  return {
    type: CHANGE_NICKNAME_REQUEST,
    data,
  }
}

const dummyUser = (data) => ({
  ...data,
  nickname: 'zerocho',
  id: shortId.generate(),
  Posts: [],
  Followings: [
    { nickname: '제로초' },
    { nickname: '부기초' },
    { nickname: '냥냥' },
  ],
  Followers: [
    { nickname: '제로초' },
    { nickname: '부기초' },
    { nickname: '냥냥' },
  ],
})

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true
        draft.logInError = null
        draft.logInDone = false
        break

      case LOG_IN_SUCCESS: //사가가 호출해주는 액션이라서 굳이 위에서 만들어줄 필요는 없음
        draft.logInLoading = false
        draft.logInDone = true
        draft.me = dummyUser(action.data)
        break

      case LOG_IN_FAILURE:
        draft.logInLoading = false
        draft.logInError = action.error
        break

      case LOG_OUT_REQUEST:
        draft.logOutError = null
        draft.logOutDone = false
        draft.logOutLoading = true
        break

      case LOG_OUT_SUCCESS:
        draft.logOutDone = false
        draft.logOutLoading = false
        draft.me = null
        break

      case LOG_OUT_FAILURE:
        draft.logOutError = action.error
        draft.logOutLoading = false
        break

      case SIGN_UP_REQUEST:
        draft.signUpDone = false
        draft.signUpLoading = true
        draft.signUpError = null
        break

      case SIGN_UP_SUCCESS:
        draft.signUpDone = true
        draft.signUpLoading = false
        break

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameDone = false
        draft.changeNicknameLoading = true
        draft.changeNicknameError = null
        break

      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameDone = true
        draft.changeNicknameLoading = false
        break

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false
        draft.changeNicknameError = action.error
        break

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data })
        break

      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((el) => el.id !== action.data) //대입을 하긴 해야함 unshift같은거는 그냥 그 자체가 바뀌는거지만..
        return

      default:
        return draft
    }
  })
}

export default reducer

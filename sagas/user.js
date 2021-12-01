import { all, delay, fork, put, takeLatest } from '@redux-saga/core/effects'
import axios from 'axios'

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user'

function logInAPI(data) {
  return axios.post('/api/login', data)
}

function* logIn(action) {
  //LOG_IN_REQUEST에서 리턴되는 객체를 받아옴
  try {
    // const result = yield call(logInAPI, action.data)
    yield delay(1000)
    yield put({
      type: LOG_IN_SUCCESS, //다시 그냥 리덕스쪽으로 액션이 넘어감
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutAPI() {
  return axios.post('/api/logout')
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI)
    yield delay(1000)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function signUpAPI(data) {
  return axios.post('/api/signup', data)
}

function* signUp() {
  try {
    //const result = yield call(signUpAPI)
    yield delay(1000)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn) //LOG_IN_REQUEST라는 액션이 실행되면 logIn함수 실행
} //그냥 리덕스쪽에서 액션을 실행하면 사가가 관찰하다가 이게 실행되는 것을 감지한다. 그러면 logIn이 실행된다.

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)])
}

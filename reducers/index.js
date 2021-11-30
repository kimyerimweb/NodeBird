import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    //SSR때문에 HYDRATE넣어줘야 함
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action)
        return { ...state, ...action, payload }

      default:
        return state
    }
  },
  user, //합치려고 불러온 애들을 넣어주면 된다. 알아서 initialState는 합쳐줌
  post,
})

export default rootReducer

export const initialState = {
  //이제 더미 데이터를 useState말고 여기다 넣으면 된다.
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '김예림',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://media.vlpt.us/images/cyheum/post/a21ac839-e534-4eb3-8fa5-342a45818a53/react-logo.png',
        },
        {
          src: 'https://media.vlpt.us/images/wooder2050/post/d2764478-dc72-4cc9-9128-f66bfb8b3aa3/reactintroduction.png',
        },
        {
          src: 'https://seokjun.kim/content/images/2020/11/stop-using-react.png',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          User: {
            nickname: 'zero',
          },
          content: '얼른 사고 싶어요',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

const dummyPost = {
  id: 2,
  User: {
    id: 2,
    nickname: '예림킴',
  },
  content: '두 번째 게시글 #해시태그 #뷰뷰뷰',
  Images: [
    {
      src: 'https://media.vlpt.us/images/taese0ng/post/82c7a9ee-7d30-44eb-be74-6814dd66b64c/logo-vuejs-min.png',
    },
    {
      src: 'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/6emG/image/ricOCxnz_i_AJbRNyQv7krfaoug',
    },
  ],
  Comments: [
    {
      User: {
        nickname: 'gero',
      },
      content: '이번엔 뷰군뇨',
    },
    {
      User: {
        nickname: 'sero',
      },
      content: '뷰가 좀 더 쉽긴 한 것 같네요',
    },
  ],
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data: dummyPost, //form에 뭔가 입력했을 때 다음으로 안넘어감 거기서 문제 있는 듯
})

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      }

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostDone: true,
        addPostLoading: false,
      }

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostDone: false,
        addPostLoading: false,
      }

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentError: null,
        addCommentDone: false,
      }

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      }

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.data,
      }

    default:
      return state
  }
}

export default reducer

import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'

export const initialState = {
  //이제 더미 데이터를 useState말고 여기다 넣으면 된다.
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

export const generateDummyPost = (number) =>
  Array(number) //지금은 20개지만 나중에 최적화 고려하면 수천개의 더미 데이터를 넣고 돌려서 끊김없는 최적화를 하는게 실력임
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }))

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Imagrs: [],
  Comments: [],
})

const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: data.userId,
    nickname: '예림킴',
  },
  content: data.content,
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
})

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data, //form에 뭔가 입력했을 때 다음으로 안넘어감 거기서 문제 있는 듯
})

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
})

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break

      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data))
        draft.addPostDone = true
        draft.addPostLoading = false
        break

      case ADD_POST_FAILURE:
        draft.addPostLoading = false
        draft.addPostError = action.error
        break

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true
        draft.removePostError = null
        break

      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter((el) => el.id !== action.data)
        draft.removePostDone = true
        draft.removePostLoading = false
        break

      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false
        draft.removePostError = action.error
        break

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true
        draft.addCommentError = null
        draft.addCommentDone = false
        break

      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId)
        post.Comments.unshift(dummyComment(action.data.content))
        draft.addCommentLoading = false
        draft.addCommentDone = true
        draft.mainPosts = mainPosts
        break

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false
        draft.addCommentError = action.data
        break

      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true
        draft.loadPostsDone = false
        draft.loadPostsError = null
        break

      case LOAD_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data)
        draft.loadPostsDone = true
        draft.loadPostsLoading = false
        draft.hasMorePosts = draft.mainPosts.length < 50
        break

      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false
        draft.loadPostsError = action.error
        break

      default:
        return draft
    }
  })
}

export default reducer

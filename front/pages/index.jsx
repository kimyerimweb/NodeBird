import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'
import { useInView } from 'react-intersection-observer'

const Home = () => {
  const [ref, inView] = useInView()
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post)

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
    dispatch({
      type: LOAD_USER_REQUEST,
    })
  }, [])

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      })
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts])

  return (
    <>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
        <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
      </AppLayout>
    </>
  )
}

export default Home

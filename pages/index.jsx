import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { loadPostRequestAction } from '../reducers/post'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPostRequestAction)
  }, [])

  const { logInDone } = useSelector((state) => state.user)
  const mainPosts = useSelector((state) => state.post.mainPosts)

  return (
    <>
      <AppLayout>
        {logInDone && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </AppLayout>
    </>
  )
}

export default Home

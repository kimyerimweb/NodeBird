import AppLayout from '../components/AppLayout'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const Home = () => {
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

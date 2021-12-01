import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
  const followerList = [
    { nickname: '제로초0' },
    { nickname: '제로초1' },
    { nickname: '제로초2' },
  ]
  const followingList = [
    { nickname: '제로초3' },
    { nickname: '제로초4' },
    { nickname: '제로초5' },
  ]

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={followingList} />
        <FollowList header="팔로워" data={followerList} />
      </AppLayout>
    </>
  )
}

export default Profile

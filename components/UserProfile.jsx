import React from 'react'
import { Avatar, Card, Button } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const onLogOut = useCallback(() => {
    dispatch(logOutRequestAction())
  }, [])

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.follwings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {me.follwers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickanme}</Avatar>} title={me.nickname} />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  )
}

export default UserProfile

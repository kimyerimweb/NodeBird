import React, { useCallback } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { followRequestAction, unfollowRequestAction } from '../reducers/user'

const FollowButton = ({ post }) => {
  const dispatch = useDispatch()
  const { me, unfollowLoading, followLoading } = useSelector(
    (state) => state.user
  )
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id)
  const onClickFollowButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction(post.User.id))
    } else {
      dispatch(
        followRequestAction({ id: post.User.id, nickname: post.User.nickname })
      )
    }
  }, [isFollowing])

  if (post.User.id === me.id) {
    return null
  }

  return (
    <Button
      loading={followLoading || unfollowLoading}
      onClick={onClickFollowButton}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  )
}

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default FollowButton

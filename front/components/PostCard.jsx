import { Card, Popover, Button, Avatar, Comment, List } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import { useCallback, useState } from 'react'
import PostCardContent from './PostCardContent'
import { removePostRequestAction } from '../reducers/post'
import FollowButton from './FollowButton'

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [commentOpend, setCommentOpend] = useState(false)
  const { removePostLoading } = useSelector((state) => state.post)
  const id = useSelector((state) => state.user.me?.id)
  const dispatch = useDispatch()

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev)
  }, [])

  const onToggleComment = useCallback(() => {
    setCommentOpend((prev) => !prev)
  })

  const onRemovePost = useCallback(() => {
    dispatch(removePostRequestAction(post.id))
  })

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                ></Comment>
              </li>
            )}
          />
        </div>
      )}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard

import { Button, Form, Input } from 'antd'
import { useCallback, useEffect } from 'react'
import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentRequestAction } from '../reducers/post'

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id)
  const { addCommentDone } = useSelector((state) => state.post)
  const { addCommentLoading } = useSelector((state) => state.post)
  const [commentText, setCommentText, onChangeCommnetText] = useInput('')

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('')
    }
  }, [addCommentDone])

  const dispatch = useDispatch()
  const onsubmitComment = useCallback(() => {
    dispatch(
      addCommentRequestAction({
        content: commentText,
        postId: post.id,
        userId: id,
      })
    )
  }, [commentText, id])

  return (
    <Form onFinish={onsubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommnetText}
          rows={4}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 10000 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm

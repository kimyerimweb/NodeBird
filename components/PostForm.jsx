import { Button, Form, Input } from 'antd'
import { useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { addPostRequestAction } from '../reducers/post'

const PostForm = () => {
  const imageInput = useRef()

  const { imagePaths } = useSelector((state) => state.post)
  const { addPostDone } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const [text, setText, onChangeText] = useInput('')

  useEffect(() => {
    if (addPostDone) {
      setText('')
    }
  }, [addPostDone])

  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction({})) //액션은 원래 객체고 동적으로 만들 때만 함수라서..지금은 객체 맞음
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click() //이미지 업로드용 인풋은 숨겨져 있고 버튼이 대신하고 있는데, 버튼을 누르면 인풋을 누르게끔 ref를 이용한다.
  }, [imageInput.current])

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt={v} />
              <Button>제거</Button>
            </div>
          ))}
        </div>
      </div>
    </Form>
  )
}

export default PostForm

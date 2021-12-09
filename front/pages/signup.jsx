import Head from 'next/head'
import { useState, useCallback } from 'react'
import AppLayout from '../components/AppLayout'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../reducers/user'

const ErrorMessage = styled.div`
  color: red;
`

const Signup = () => {
  const dispatch = useDispatch()
  const { signUpLoading } = useSelector((state) => state.user)

  const [email, setEmail, onChangeEmail] = useInput('')
  const [nickname, setNickname, onChangeNickname] = useInput('')
  const [password, setPassword, onChangePassword] = useInput('')

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value)
      setPasswordError(e.target.value !== password)
    },
    [password]
  )

  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(true)
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordCheck(true)
    }

    if (!term) {
      return setTermError(true)
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    })
  }, [email, nickname, password])

  return (
    <>
      <Head>
        <title>회원 가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              value={email}
              type="email"
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-passwordCheck">비밀번호 확인</label>
            <br />
            <Input
              name="user-passwordCheck"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              김예림 말을 잘 들을 것을 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="Submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  )
}

export default Signup

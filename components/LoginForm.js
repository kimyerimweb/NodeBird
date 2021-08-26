import { Form, Input, Button } from "antd";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Proptypes from "prop-types";
import useInput from "../hooks/useInput";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const { useCallback } = React;

const LoginForm = ({ setLoggedIn }) => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          name="user-id"
          value={id}
          onChange={onChangeId}
          placeholder="아이디"
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
        <Button>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: Proptypes.func.isRequired,
};

export default LoginForm;

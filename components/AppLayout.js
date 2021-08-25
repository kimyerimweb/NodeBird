import React from "react";
import Proptypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";

const { useState } = React;
const { Search } = Input;

const MiddleSearch = styled(Input.Search)`
  width: 200px;
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <MenuItem>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <MiddleSearch
            placeholder="input search text"
            //onSearch={onSearch}
          />
        </MenuItem>
        <MenuItem>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </MenuItem>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setLoggedIn={setLoggedIn} />
          ) : (
            <LoginForm setLoggedIn={setLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired,
};

export default AppLayout;

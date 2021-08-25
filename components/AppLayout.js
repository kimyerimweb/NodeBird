import React from "react";
import Proptypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import LoginForm from "./LoginForm";

const { useState } = React;

const { Search } = Input;

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
          <Search
            placeholder="input search text"
            //onSearch={onSearch}
            style={{ width: 200, verticalAlign: "middle" }}
          />
        </MenuItem>
        <MenuItem>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </MenuItem>
      </Menu>
      <Row gutter={8}>
        <Col xs={24}>{isLoggedIn ? <UserProfile /> : <LoginForm />}</Col>
        <Col xs={24}>{children}</Col>
        <Col xs={24}></Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired,
};

export default AppLayout;

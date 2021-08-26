import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers";
const { Meta } = Card;

const UserProfile = () => {
  const dispatch = useDispatch();
  const onClickBtn = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="kimyerim" src="1587942842259-3.jpg" />}
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar src="1587942842259-3.jpg" />}
        title="Kimyerim"
        description="Hello"
      />

      <Button onClick={onClickBtn}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;

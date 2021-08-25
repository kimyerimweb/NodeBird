import React, { useMemo } from "react";
import { List } from "antd";
import { Button, Card } from "antd";
import { StopOutlied } from "@ant-design/icons";
import PropTypes from "prop-types";

const FollowList = ({ header, data }) => {
  const style = useMemo(
    () => ({
      marginBottom: "20px",
    }),
    []
  );

  return (
    <List
      style={style}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={<StopOutlied key="stop" />}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.PropTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;

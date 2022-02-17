import React from "react";
import { Table } from 'antd'

const VoteTable = (props) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '选票合计',
      dataIndex: 'voteCount',
      key: 'voteCount'
    }
  ]

  return (
    <div style={{marginBottom: 20}}>
      <Table dataSource={props.votes} columns={columns} pagination={false} />
    </div>
  );
};

export default VoteTable;

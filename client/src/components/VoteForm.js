import React from "react";
import { Form, Select, Checkbox, Button } from 'antd'

const VoteForm = (props) => {
  return (
    <Form layout="inline">
      <Form.Item label="投票人">
        <Select
          placeholder="请选择投票人"
          onChange={(value) => {
            props.selectCandidate(value);
          }}>
          {props.options.map((option) => {
            return (
              <Select.Option key={option.key} label={option.text} value={option.value}>{option.text}</Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Checkbox
          onChange={() => props.toggleTermsConfirmation()}
        >
          同意投票
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button onClick={() => props.handleSubmit()}>投票</Button>
      </Form.Item>
    </Form>
  );
};

export default VoteForm;

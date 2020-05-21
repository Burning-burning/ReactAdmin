import React, { Component } from 'react'
import {Form, Select, Input} from 'antd'
const Option = Select.Option
//添加分类的form组件
export default class AddForm extends Component {
  render() {
    return (
      <Form>
        <Form.Item
           name="parentId"
           initialValue="1"
           rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select>
            <Option value="0">一级分类</Option>
            <Option value="1">电脑</Option>
            <Option value="2">家具</Option>
          </Select>
        </Form.Item>
        <Form.Item
           name="categoryName"
           rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="请输入分类名称"></Input>
        </Form.Item>
      </Form>
    )
  }
}

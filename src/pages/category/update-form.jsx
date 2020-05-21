import React, { Component } from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'
//添加分类的form组件
export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
  }

  render() {
    const {categoryName} = this.props
    console.log("son",categoryName)
    return (
      
    )
  }
}


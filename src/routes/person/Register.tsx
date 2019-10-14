import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { Md5 } from 'ts-md5'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { register, login } from '../../api/person'
import action from '../../store/action/index'
import { PersonState, personInfo } from '../../store/type'

const FormItem = Form.Item

interface PromsFormMap {
  baseInfo: personInfo
}

interface PropFromDisptch {
  personSetLogin: (islogin: boolean) => void
  queryBaseInfo: () => void
}

type RegisterProps = FormComponentProps &
  PropFromDisptch &
  RouteComponentProps &
  PromsFormMap

class Register extends React.Component<RegisterProps, any> {
  public render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
      <section className='personLoginBox'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label='用户名'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label='邮箱'>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '输入的邮箱格式不正确!' }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label='手机'>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号!' }]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label='密码'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(<Input type='password' />)}
          </FormItem>

          <FormItem>
            <Button type='primary' htmlType='submit'>
              立即注册
            </Button>
          </FormItem>
        </Form>
      </section>
    )
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { name, email, phone, password } = values
        password = Md5.hashStr(password)

        let result = await register({
          name,
          phone,
          email,
          password
        })
        if (result.code === 0) {
          /*    
          注册完成后,          
          更新登录状态
          跳转到信息页面 */
          //1. 向服务器发动当前注册用户的用户名密码进行登录
          let loginResult = await login({
            name,
            password
          })

          if (loginResult.code === 0) {
            // 从服务器获取当前注册的用户信息,
            //  更新 redux 中的 baseInfo 数据,
            this.props.queryBaseInfo()
            this.props.personSetLogin(true)
            this.props.history.push('/person/info')
            return
          }
        }
      }
    })
  }
}

const mapState2Props = (state: PersonState) => {
  if (state.baseInfo !== undefined) {
    return {
      baseInfo: state.baseInfo
    }
  }
}
const mapDispatch = {
  personSetLogin: action.person.personSetLogin,
  queryBaseInfo: action.person.queryBaseInfo
}
export default Form.create()(
  withRouter(
    connect(
      mapState2Props,
      mapDispatch
    )(Register)
  )
)

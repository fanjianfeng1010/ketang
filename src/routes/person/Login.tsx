import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Input, Icon, Button, Form, Checkbox, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { Md5 } from 'ts-md5'
import { login } from '../../api/person'
import { PersonState } from '../../store/type'
import action from '../../store/action/index'

interface PropFromDisptch {
  personSetLogin: (islogin: boolean) => void
  getShopCart: (state: number) => void
}
type LoginProps = FormComponentProps & RouteComponentProps & PropFromDisptch

function warning() {
  Modal.warning({
    title: '登录失败',
    content: '请校验用户名或密码是否正确'
  })
}

class Login extends React.Component<LoginProps> {
  handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // 校验用户输入信息成功后,向服务器发送登录信息,如果成功,redux 中设置登录状态,并跳转到用户信息页
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { username, password } = values
        password = Md5.hashStr(password)
        let result = await login({
          name: username,
          password
        })
        if (result.code === 0) {
          await this.props.personSetLogin(true)
          // 登录成功后,需要重新获取已购买的课程信息(未登录下从服务器获取的支付课程信息是获取不到的,但是登录后我们需要把购买的信息同步到 redux 中,这样)
          await this.props.getShopCart(1)
          this.props.history.push('/person/info')
          return
        }
        warning()
      }
    })
  }
  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="login-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/person/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapState2Props = (state: PersonState) => {
  return {
    baseInfo: state.baseInfo
  }
}

const mapDispatch = {
  personSetLogin: action.person.personSetLogin,
  getShopCart: action.course.getShopCart
}

export default Form.create()(
  connect(
    mapState2Props,
    mapDispatch
  )(Login)
)

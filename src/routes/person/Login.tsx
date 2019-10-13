import * as React from 'react'
import { connect } from 'react-redux'

export interface ILoginProps {}
export interface LoginState {}

class Login extends React.Component<ILoginProps> {
  public render() {
    return <div>登录</div>
  }
}

const mapState2Props = (state: LoginState) => {
  return {}
}

export default connect(mapState2Props)(Login)

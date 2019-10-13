import * as React from 'react'
import { connect } from 'react-redux'

export interface IRegisterProps {}
export interface RegisterState {}

class Register extends React.Component<IRegisterProps> {
  public render() {
    return <div>注册</div>
  }
}

const mapState2Props = (state: RegisterState) => {
  return {}
}

export default connect(mapState2Props)(Register)

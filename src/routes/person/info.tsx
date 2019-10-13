import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button } from 'antd'

import { exitLogin, queryInfo, personInfo } from '../../api/person'

export interface IInfoProps {}
export interface InfoState {
  baseInfo?: personInfo
}

export type ApplicationProps = IInfoProps & RouteComponentProps

class Info extends React.Component<ApplicationProps, InfoState> {
  async componentDidMount() {
    let result = await queryInfo()
    console.log(result.code)
    if (result.code === 0) {
      this.setState({
        baseInfo: result.data
      })
    } else {
      this.setState({
        baseInfo: undefined
      })
    }
  }

  constructor(props: ApplicationProps) {
    super(props)

    this.state = {
      baseInfo: {}
    }
  }
  public render() {
    if (!this.state.baseInfo) {
      return '没有个人信息'
    }
    let { name, email, phone } = this.state.baseInfo
    return (
      <div className='person-base-info'>
        <p>
          <span>用户名</span>
          <span>{name}</span>
        </p>
        <p>
          <span>邮箱</span>
          <span> {email}</span>
        </p>
        <p>
          <span>电话</span>
          <span> {phone}</span>
        </p>
        <Button
          type='danger'
          onClick={async (ev: MouseEvent) => {
            await exitLogin().then(resolve => {
              this.props.history.push('/person')
            })
          }}>
          退出登录
        </Button>
      </div>
    )
  }
}

const mapState2Props = (state: InfoState) => {
  return {}
}

export default withRouter(connect(mapState2Props)(Info))

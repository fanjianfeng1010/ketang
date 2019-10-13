import React, { MouseEvent } from 'react'
/* 第三方模块 */
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'

/* 业务逻辑模块 */
import action from '../../store/action'
import { exitLogin } from '../../api/person'

export interface InfoState {}

interface propFormDispatch {
  queryInfo: () => void
}

export type ApplicationProps = RouteComponentProps & propFormDispatch

class Info extends React.Component<ApplicationProps, InfoState> {
  async componentDidMount() {
    await this.props.queryInfo()
  }

  public render() {
    return (
      <div className='person-base-info'>
        <p>
          <span>用户名</span>
          <span></span>
        </p>
        <p>
          <span>邮箱</span>
          <span> </span>
        </p>
        <p>
          <span>电话</span>
          <span> </span>
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

const mapDispatchToProps = {
  queryInfo: action.person.queryBaseInfo
}

export default withRouter(
  connect(
    mapState2Props,
    mapDispatchToProps
  )(Info)
)

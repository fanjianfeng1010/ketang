import React, { MouseEvent } from 'react'
/* 第三方模块 */
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
/* 业务逻辑模块 */
import action from '../../store/action'
import { exitLogin } from '../../api/person'

/* 类型*/
import { PersonState, AllState } from '../../store/type'

interface propFormDispatch {
  queryBaseInfo: () => void
  personSetLogin: (islogin: boolean) => void
}

interface PropsFromMap {
  isLogin: boolean
}

export type ApplicationProps = RouteComponentProps &
  PersonState &
  propFormDispatch

class Info extends React.Component<ApplicationProps> {
  // 组件加载完毕后,从 redux 中获用户信息,如果没有数据,从服务器中获取数据保存到 redux 中
  async componentDidMount() {
    let { baseInfo, queryBaseInfo } = this.props
    if (!baseInfo) {
      queryBaseInfo()
    }
  }

  public render() {
    let { baseInfo } = this.props
    if (!baseInfo) {
      return '没有数据'
    }
    let { name, email, phone } = baseInfo
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
          <span>{phone} </span>
        </p>

        <Button
          type='danger'
          onClick={async (ev: MouseEvent) => {
            await exitLogin().then(resolve => {
              // 退出登录后跳转到用户首页
              this.props.personSetLogin(false)
              this.props.history.push('/person')
            })
          }}>
          退出登录
        </Button>
      </div>
    )
  }
}

const mapState2Props = (state: AllState) => {
  if (state !== undefined) {
    return {
      baseInfo: state.person.baseInfo,
      isLogin: state.person.isLogin
    }
  }
}

const mapDispatchToProps = {
  queryBaseInfo: action.person.queryBaseInfo,
  personSetLogin: action.person.personSetLogin
}

export default withRouter(
  connect(
    mapState2Props,
    mapDispatchToProps
  )(Info)
)

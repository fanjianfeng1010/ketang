import * as React from 'react'
import { connect } from 'react-redux'
import { AllState } from '../store/type'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'

// 导入二级路由
import Login from './person/Login'
import Register from './person/Register'
import Info from './person/Info'
import Tip from './person/Tip'

interface PropFromMap {
  isLogin: boolean
}

export type AllPorps = PropFromMap & RouteComponentProps

class Person extends React.Component<AllPorps, any> {
  // 验证是否登录

  public render() {
    return (
      <section>
        <Switch>
          <Route
            path='/person/info'
            render={() => {
              // 验证是否登录的权限校验,权限校验的是同步的,所以不能在这里进行一步操作
              if (this.props.isLogin) {
                return <Info />
              }
              return <Tip />
            }}
          />
          <Route path='/person/login' component={Login} />
          <Route path='/person/register' component={Register} />
          <Redirect from='/person' to='/person/info' />
        </Switch>
      </section>
    )
  }
}

const mapState2Props = (state: AllState) => {
  return {
    isLogin: state.person.isLogin
  }
}

export default connect(mapState2Props)(Person)

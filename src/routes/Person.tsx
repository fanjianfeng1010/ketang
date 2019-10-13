import * as React from 'react'
import { connect } from 'react-redux'
import { PersonState } from '../store/type'
import { Switch, Route, Redirect } from 'react-router-dom'

// 导入二级路由
import Login from './person/Login'
import Register from './person/Register'
import Info from './person/Info'
import Tip from './person/Tip'

// import API
import { checkLogin } from '../api/person'

export interface IPersonProps {}

export interface IPersonState {
  isLogin: boolean
}

class Person extends React.Component<IPersonProps, IPersonState> {
  // 验证是否登录
  async componentDidMount() {
    let result = await checkLogin(),
      isLogin = result.code === 0 ? true : true
    this.setState({
      isLogin
    })
  }

  constructor(props: IPersonProps) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  public render() {
    return (
      <section>
        <Switch>
          <Route
            path='/person/info'
            render={() => {
              // 验证是否登录的权限校验,权限校验的是同步的
              if (this.state.isLogin) {
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

const mapState2Props = (state: PersonState) => {
  return {}
}

export default connect(mapState2Props)(Person)

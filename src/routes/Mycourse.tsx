import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { Menu } from 'antd'

// 私有组件
import unpay from './mycourse/unpay'
import pay from './mycourse/pay'

// css样式
import '../static/css/my-course.less'

export interface MyCourseState {
  current: string
}

type MyCourseProps = RouteComponentProps

class Mycourse extends React.Component<MyCourseProps, MyCourseState> {
  constructor(props: MyCourseProps) {
    super(props)
    this.state = {
      current: this.props.location.pathname === '/mycourse/pay' ? 'pay' : 'unpay'
    }
  }

  render() {
    return (
      <section className="mycourse-box">
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="unpay">未支付</Menu.Item>

          <Menu.Item key="pay">已支付</Menu.Item>
        </Menu>
        <Switch>
          <Route path="/mycourse/unpay" exact component={unpay} />
          <Route path="/mycourse/pay" component={pay} />
          <Redirect from="/mycourse" to="/mycourse/unpay" />
        </Switch>
      </section>
    )
  }

  handleClick = (e: any) => {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
    // 点击跳转到指定的路由地址
    this.props.history.push(e.key === 'pay' ? '/mycourse/pay' : '/mycourse/unpay')
  }
}

export default Mycourse

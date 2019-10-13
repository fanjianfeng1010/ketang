import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { Icon } from 'antd'
export interface INavBottomProps {}

export interface NavState {}

class NavBottom extends React.Component<INavBottomProps> {
  public render() {
    return (
      <footer className='footer-nav-box'>
        <NavLink to='/course'>
          <Icon type='home' />
          <span>首页</span>
        </NavLink>
        <NavLink to='/mycourse'>
          <Icon type='solution' />
          <span>我的课程</span>
        </NavLink>
        <NavLink to='/person'>
          <Icon type='user' />
          <span>个人中心</span>
        </NavLink>
      </footer>
    )
  }
}

const mapState2Props = (state: NavState) => {
  return {}
}

export default withRouter(connect(mapState2Props)(NavBottom))

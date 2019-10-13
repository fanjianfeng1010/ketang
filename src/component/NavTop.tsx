import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Icon } from 'antd'

export interface INavTopProps {}

export interface INavTopState {
  in: boolean
}
export interface NavTopState {}

class NavTop extends React.Component<INavTopProps, INavTopState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      in: false
    }
  }

  public render() {
    console.log(this.state.in)
    return (
      <header className='header-nav-box'>
        <div className='home-box'>
          <div className='base-box'>
            <h1 className='logo'>珠峰培训</h1>
            <Icon
              className='icon'
              type='bars'
              style={{
                fontSize: '.6rem'
              }}
              onClick={() => {
                console.log(this.state)
                this.setState({
                  in: !this.state.in
                })
              }}
            />
          </div>
          <CSSTransition
            in={this.state.in}
            timeout={2000}
            classNames='filter-box'
            unmountOnExit>
            <ul className='filter-box'>
              <li>全部课程</li>
              <li>react课程</li>
              <li>Vue课程</li>
              <li> 小程序课程</li>
            </ul>
          </CSSTransition>
        </div>
      </header>
    )
  }
}

const mapState2Props = (state: NavTopState) => {
  return {}
}

export default withRouter(connect(mapState2Props)(NavTop))

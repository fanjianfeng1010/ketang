import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Icon } from 'antd'
import action from '../store/action/course'
import { PayLoadType } from '../store/type'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    type?: string
  }
}

export interface INavTopState {
  in: boolean
}
interface PropFromDisaptch {
  getList: (payload?: PayLoadType) => void
  getShop: (state: number) => void
}

type NavProps = PropFromDisaptch

class NavTop extends React.Component<NavProps, INavTopState> {
  constructor(props: NavProps) {
    super(props)
    this.state = {
      in: false
    }
  }

  async componentDidMount() {
    await this.props.getShop(0)
    await this.props.getShop(1)
  }

  public render() {
    return (
      <header className='header-nav-box'>
        <div className='home-box'>
          <div className='base-box'>
            <h1 className='logo'>一个标题</h1>
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
            <ul className='filter-box' onClick={this.handleClick}>
              <li type='all'>全部课程</li>
              <li type='react'>react课程</li>
              <li type='vue'>Vue课程</li>
              <li type='xiaochengxu'> 小程序课程</li>
            </ul>
          </CSSTransition>
        </div>
      </header>
    )
  }

  handleClick = (e: MouseEvent) => {
    console.log('click')
    let target = e.target as any,
      tarTag = target.tagName
    if (tarTag === 'LI') {
      this.props.getList({
        page: 1,
        type: target.getAttribute('type'),
        flag: 'replace' // => 替换容器中的内容
      })
      this.setState({
        in: false
      })
    }
  }
}

const mapDispatch = {
  getList: action.getList,
  getShop: action.getShopCart
}

export default withRouter(
  connect(
    null,
    mapDispatch
  )(NavTop)
)

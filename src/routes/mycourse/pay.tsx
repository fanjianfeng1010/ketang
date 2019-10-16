import React, { Component } from 'react'
import { connect } from 'react-redux'
import action from '../../store/action/index'
import CourseItem from '../course/CourseItem'
import { AllState, shopCart } from '../../store/type'
import { Alert } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
import { checkLogin } from '../../api/person'

export interface IPayProps {
  shopCartData: shopCart
}

type AllPayProps = RouteComponentProps & IPayProps

type payState = {
  isLogin: boolean
}

class Pay extends React.Component<AllPayProps, payState> {
  constructor(props: AllPayProps) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  async componentDidMount() {
    let result = await checkLogin()
    if (result.code === 0) {
      this.setState({
        isLogin: true
      })
    }
  }
  public render() {
    console.log(this.state.isLogin)
    if (this.state.isLogin === false) {
      return (
        <Alert
          type="warning"
          description="还没有登录,请登录后查看"
          message="Warning"
          closeText="点击登录 Now"
          onClose={(ev) => {
            this.props.history.push('/person/login')
          }}
        />
      )
    }
    let { shopCartData } = this.props,
      { pay } = shopCartData

    if (shopCartData && pay.length !== 0) {
      return (
        <ul>
          {pay.map((item) => (
            <CourseItem data={item} />
          ))}
        </ul>
      )
    } else {
      return (
        <Link to="/mycourse">
          <Alert
            message="Warning"
            description="还没有已经支付完毕的订单,快去购物车支付吧."
            type="warning"
            showIcon
            closable
          />
        </Link>
      )
    }
  }
}

const mapState2Props = (state: AllState) => {
  return {
    shopCartData: state.course.shopCart
  }
}

export default connect(mapState2Props)(Pay)

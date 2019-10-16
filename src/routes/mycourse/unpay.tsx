import React from 'react'
import { connect } from 'react-redux'
import action from '../../store/action/index'
import CourseItem from '../course/CourseItem'
import { AllState, shopCart, Tmode } from '../../store/type'
import { Link } from 'react-router-dom'
import { Alert } from 'antd'
import { Button } from 'antd'

interface IPayProps {
  shopCartData: shopCart
  selectAll: boolean
  handleSelect: (mode: Tmode) => void
}

class UNPay extends React.Component<IPayProps> {
  public render() {
    let { shopCartData } = this.props,
      { unpay } = shopCartData

    if (shopCartData && unpay.length !== 0) {
      return (
        <div>
          <div>
            全选
            <input
              type="checkbox"
              onChange={(ev: any) => {
                this.props.handleSelect('all')
              }}
              checked={this.props.selectAll}
            />{' '}
            <Button type="default" onClick={this.handleDelete}>
              删除
            </Button>
            <Button type="default" onClick={this.handlePay}>
              支付
            </Button>
          </div>
          <ul className="item-wrapper">
            {unpay.map((item) => (
              <CourseItem data={item} key={item.id} />
            ))}
          </ul>
        </div>
      )
    } else {
      return (
        <Link to="/course">
          <Alert
            message="Warning"
            description="购物车为空,快去添加课程吧."
            type="warning"
            showIcon
            closable
          />
        </Link>
      )
    }
  }

  handlePay = () => {
    console.log('支付')
  }

  handleDelete = () => {
    console.log('删除')
  }
}

const mapDispatch = {
  handleSelect: action.course.handleSelect
}

const mapState2Props = (state: AllState) => {
  return {
    shopCartData: state.course.shopCart,
    selectAll: state.course.selectAll
  }
}

export default connect(
  mapState2Props,
  mapDispatch
)(UNPay)

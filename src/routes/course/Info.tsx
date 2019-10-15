import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { courseListData, shopCart, AllState } from '../../store/type'
import { RouteComponentProps } from 'react-router-dom'
import Qs from 'qs'
import action from '../../store/action/course'
import {
  addToShopCart,
  removeFormShopCart,
  queryCourseInfo
} from '../../api/course'

interface InfoState {
  data: courseListData | null
  isInShop: number
}
interface PropsFromDispatch {
  getShopCart: (state: number) => void
}

interface PropsFromMap {
  shopCart: shopCart
}

type AllInfoProps = RouteComponentProps & PropsFromDispatch & PropsFromMap

class App extends Component<AllInfoProps, InfoState> {
  public courseID: number
  constructor(props: AllInfoProps) {
    super(props)
    this.courseID = -1
    this.state = {
      data: null,
      isInShop: -1 // 存储是否已经加入到购物车 -1 没有加入购物车 0 已经加入到购物车 但是未支付 1 是已支付
    }
  }

  async componentDidMount() {
    // 根据组件的地址信息的 query,获得对应的 courseID
    let { search } = this.props.location
    let { courseID = 0 } = Qs.parse(search.substr(1)) || {}
    courseID = parseFloat(courseID)
    // 把 courseID 挂载到组件上,方便以后进行操作
    this.courseID = courseID
    // 根据courseID 获取组件数据
    let result = await queryCourseInfo(courseID)
    if (result.code === 0) {
      let data = result.data
      // 请求成功后,校验当前数据是否存在于 redux 中
      let { pay, unpay } = this.props.shopCart,
        isInShop = -1

      unpay.find(item => (item.id === courseID ? (isInShop = 0) : null))
      pay.find(item => (item.id === courseID ? (isInShop = 1) : null))

      // 校验后,把数据挂载到组件的状态上
      this.setState({
        data,
        isInShop
      })
    }
  }

  public render() {
    let { data, isInShop } = this.state
    if (!data) return '没有信息'
    let { name, dec, price, pic } = data
    return (
      <div className='base-info'>
        <video src='' controls preload='none' poster={pic}></video>
        <div className='content'>
          <h3>{name}</h3>
          <p>{dec}</p>
          <span>课程价格:{price}</span>
          {// 如果当前课程已经支付成功,不显示按钮
          isInShop !== 1 ? (
            <Button
              type={isInShop === -1 ? 'danger' : 'primary'}
              onClick={this.handleBuy}>
              {isInShop === -1 ? '加入购物车' : '从购物车中移除'}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }

  handleBuy = async () => {
    // 处理加入购物车
    if (this.state.isInShop === -1) {
      // 当前组件还没加入购物车 => 点击按钮,向服务器发送数据,添加数据近服务器中,并把数据保存在 redux 中
      let result = await addToShopCart(this.courseID)
      if (result.code === 0) {
        // 添加成功,服务器中的购物车数据已经 存入了当前数据,此时需要把当前数据存储到 redux 的 unpay 数据中
        this.props.getShopCart(0)
        // 通知组件状态更新,重新渲染
        this.setState({ isInShop: 0 })
      }
    }
    // 当组件的 isInshop === 0 的时候,说明组件已经加入购物车,点击事件发生后,需要把组件从购物车移除
    // 并且 redux 中的 unpay 数据需要进行更新
    else if (this.state.isInShop === 0) {
      let result = await removeFormShopCart(this.courseID)
      if (result.code === 0) {
        this.props.getShopCart(0) // 这里就是派发 action
        // 更新组件按钮的状态
        this.setState({
          isInShop: -1
        })
      }
    }
  }
}

const mapDispatch = {
  getShopCart: action.getShopCart
}

const mapState2Props = (state: AllState) => {
  if (state !== undefined) {
    return {
      shopCart: state.course.shopCart
    }
  }
}

export default connect(
  mapState2Props,
  mapDispatch
)(App)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Carousel, Icon, Button } from 'antd'
import action from '../../store/action/course'
import {
  AllState,
  courseBannerData,
  courseListData,
  courseInfo,
  PayLoadType
} from '../../store/type'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import CourseItem from './CourseItem'

interface IListProps {
  getBanner: () => void
  getList: (payload?: PayLoadType) => void
}

interface IListState {
  isLoading: boolean
}

interface PropsFromMap {
  banner?: courseBannerData[]
  list?: courseListData[]
  page: number
  courseType: string
  courseData: courseInfo
}

type AllProps = PropsFromMap & IListProps & RouteComponentProps

class List extends Component<AllProps, IListState> {
  constructor(props: AllProps) {
    super(props)
    this.state = { isLoading: false }
  }

  async componentDidMount() {
    // 当组件加载完成后发送异步请求加载数据
    if (this.props.banner && this.props.banner.length === 0) {
      await this.props.getBanner()
    }
    if (this.props.list && this.props.list.length === 0) {
      await this.props.getList()
    }
  }
  componentWillUpdate() {}

  componentWillReceiveProps() {
    this.setState({
      isLoading: false
    })
  }
  public render() {
    let { banner, list } = this.props
    /* TODO => 在用户点击进入详情页后,返回上级页面时,页面也回退到用户所处的滚动位置 */
    return (
      <div className="course-list-box">
        {banner && banner.length !== 0 ? (
          <Carousel autoplay>
            {banner &&
              banner.map((item) => {
                return (
                  <div key="item.id">
                    <img src={item.pic} alt={item.dec} />
                  </div>
                )
              })}{' '}
          </Carousel>
        ) : (
          ''
        )}
        <div className="course-list">
          <h2>
            <Icon type="menu-fold" />
            {this.queryType()}
          </h2>
          {/* 先确保数据存在在 props 中,并且数据有长度才渲染数据,否则提示没有数据 */}
          {list && list.length !== 0 ? (
            <div>
              <ul className="item-wrapper">
                {list.map((listItem) => (
                  <CourseItem data={listItem} key={listItem.id} checkBox={false} />
                ))}
              </ul>
              {this.props.courseData.total <= this.props.courseData.page ? (
                ''
              ) : (
                <Button type="primary" onClick={this.handleClick} loading={this.state.isLoading}>
                  加载更多
                </Button>
              )}
            </div>
          ) : (
            '暂无数据'
          )}
        </div>
      </div>
    )
  }

  queryType = (): string => {
    let { courseType } = this.props,
      text = '全部课程'
    switch (courseType) {
      case 'react':
        text = 'react'
        break
      case 'vue':
        text = 'vue'
        break
      case '小程序':
        text = '小程序'
        break
    }
    return text
  }
  handleClick = (): void => {
    let { getList, page, courseType } = this.props

    // => 防止重复点击
    if (this.state.isLoading) return
    this.setState({
      isLoading: true
    })

    // => 重新发送新的 dispatch更新数据,type 沿用当前筛选的 type,flag点击加载更多,是向容器追加新获取的信息
    getList({
      page: page + 1,
      type: courseType,
      flag: 'push'
    })
  }
}

const mapState2Props = (state: AllState) => {
  if (state !== undefined) {
    return {
      banner: state.course.banner,
      list: state.course.courseData.data,
      page: state.course.courseData.page,
      courseType: state.course.courseType,
      courseData: state.course.courseData
    }
  }
}

const mapDispatch = {
  getBanner: action.getBannerAction,
  getList: action.getList
}

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch
  )(List)
)

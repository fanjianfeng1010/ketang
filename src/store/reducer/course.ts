import { Reducer } from 'redux'
import {
  CourseState,
  QUERY_BANNER,
  QUERY_LIST,
  QUERY_SHOPCART,
  HANDLE_SELECT,
  courseAction,
  courseListData
} from '../type'

let init_state: CourseState = {
  banner: [],
  courseData: {
    limit: 10,
    total: 1,
    page: 1,
    data: []
  },
  courseType: 'all',
  shopCart: {
    unpay: [],
    pay: []
  },
  selectAll: true
}

const course = (state = init_state, action: courseAction) => {
  let newState = JSON.parse(JSON.stringify(state)) as CourseState

  switch (action.type) {
    case QUERY_BANNER:
      newState.banner = action.payload.data
      return newState
    case QUERY_LIST:
      let { listResult, flag, courseType } = action
      newState.courseType = courseType
      if (action.listResult.code === 0) {
        newState.courseData.total = listResult.total
        newState.courseData.limit = listResult.limit
        newState.courseData.page = listResult.page
        newState.courseData.data =
          flag === 'push' ? newState.courseData.data.concat(listResult.data) : listResult.data
      }
      break
    case QUERY_SHOPCART:
      {
        let { shopResult, state } = action
        if (shopResult.code === 0) {
          state === 0
            ? // 当用户把课程添加进购物车后,自动为数据添加 check 属性
              (newState.shopCart.unpay = shopResult.data) &&
              (newState.shopCart.unpay = newState.shopCart.unpay.map((item) => {
                return { ...item, check: true }
              }))
            : (newState.shopCart.pay = shopResult.data)
        }
      }
      break
    case HANDLE_SELECT:
      let mode = action.mode
      if (mode === 'all') {
        // 如果进行选择前已经是全选状态,那么再次选择全选为取消全选状态

        newState.selectAll = !newState.selectAll
        // 把所有存储在列表中的数据标记选择状态为用户所使用的 => true -> false  false -> true
        newState.shopCart.unpay = newState.shopCart.unpay = newState.shopCart.unpay.map((item) => {
          return { ...item, check: newState.selectAll }
        })
      } else {
        // 其余情况,handle_select 处理的是单个 item 的复选框
        // , 根据当前 item.id 匹配当前的 mode 传入的数字 => 由 courseID提供,改变 item 内部check 状态
        console.log('其余情况')
        let item = newState.shopCart.unpay.find((item) => item.id === mode) as courseListData
        item.check = !item.check

        // 定义 f => flag 标识 用于查看是否当前资料中是否全部的 check 状态是否相同,如果都是相同,则设置 selectAll 为 true
        let f = state.shopCart.unpay.find((item) => {
          return item.check === false
        })
        f ? (state.selectAll = false) : (state.selectAll = true)
      }
  }
  return newState
}

export default course as Reducer<CourseState>

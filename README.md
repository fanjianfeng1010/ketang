## 由 react redux typescript 完成的网上选课系统

## 下面是学习笔记

- 为了不让每次更新组件都刷新页面，配置热加载

  - yarn add react-hot-loader --dev
  - 在 webpack.config.js 370 行 babel-loader 添加

  ```javascript
  plugins: [
    [
      require.resolve('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
          }
        }
      },
      'react-hot-loader/babel' // 这里是添加的行
    ]
  ]
  ```

  - 在需要用到热加载的组件 引入 hot `import { hot } from 'react-hot-loader'`
  - 最后到处经过 hot 函数高阶后的组件 `export default hot(module)(Component)`

- 使用 react-transition-group 实现过度效果

  - 安装 yarn add react-transition-group

  - 引入 `import { CSSTransition } from 'react-transition-group'`

  - 使用 ```typescript
    <CSSTransition
            in={this.state.in}
            timeout={2000}
            unmountOnExit
            classNames='filter-box'>

      <ul className='filter-box'>
      <li>全部课程</li>
      <li>react 课程</li>
      <li>Vue 课程</li>
      <li> 小程序课程</li>
      </ul>
    </CSSTransition>

        ```

  - CSSTransition 是一个持续的动画，因为我通过 `in` 控制列表的隐藏和现实，所以在配置上加入了
    `unmountOnExit`
  - CSSTransition 通过包裹同类名元素，为该元素添加过度效果，在过度进行和结束期间添加不同的类名以达到动画的过度，而控制组件的显示和隐藏是通过操作组件的状态

- 使用 Axios 响应拦截器返回的响应主体,即只返回服务器响应成功后的 data 内容

  - 在 axios 设置拦截器

  ```typescript
  axios.interceptors.response.use((result: AxiosRequestConfig) => result.data)
  ```

  - 在发送请求的函数显式告诉拦截后返回内容的格式

  ```typescript
  interface LoginResponse {
    code: number
    msg?: string
  }

  // 验证是否登录
  export function checkLogin(): Promise<LoginResponse> {
    return axios.get('/personal/login')
  }
  ```

* react-router-dom 知识点

  - 在 Route 组件中,使用 render 函数返回的组件不是受路由管控的组件,要使用 widthRouter 高阶处理

  - 权限校验

    - 路由的验证和渲染是同步的,不允许在校验中出现异步,因为这样在异步没有完成之前,根本不知道该渲染谁,语法不支持这样操作
    - 下面代码的操作方式是不允许的
      ```typescript
      <Route
        path='/person/info'
        render={async () => {
          // 验证是否登录的权限校验,权限校验的是同步的
          let result = await checkLogin()
          if (result.code === 0) {
            return <Info />
          }
          return <Tip />
        }}
      />
      ```

  - 当路由切换的时候,对应的组件回重新渲染,但是渲染也要分情况
    - 之前渲染其他组件的时候把当前组件彻底从页面一处了,再次渲染当前组件,走的是第一次挂载的流程(也就是一切从头开始)
    - 如果当前组件之前没有彻底在页面中移除(本组件内容的子组件在切换),每一次走的是更新的流程,不是重新挂载的流程

* typescript redux thunk 流程梳理

  - 定义行为标识,此处 person 只有一个用于与服务器获取数据的行为
    - ```typescript
      export enum personActionType {
        PERSON_QUERY_BASE = 'PERSON_QUERY_BASE'
      }
      ```
  - 根据行为标识派发 action

    ```typescript
    // 接口 personGetInfoAction 定义了获取数据行为的 type 和 result
    /*
      export interface personGetInfoAction extends Action {
        type: personActionType.PERSON_QUERY_BASE
        result: PersonInfoResponse
      }
    */
    import { personActionType, personGetInfoAction } from '../type'
    import { Action } from 'redux'
    import { ThunkAction } from 'redux-thunk'
    import { queryInfo } from '../../api/person'
    import { Dispatch } from 'redux'

    export interface IPersonState {}

    type ThunkResult<R> = ThunkAction<
      R,
      IPersonState,
      undefined,
      Action<personGetInfoAction>
    >

    const queryBaseInfo = (): ThunkResult<void> => {
      return async (dispatch: Dispatch) => {
        const result = await queryInfo()
        dispatch({
          type: personActionType.PERSON_QUERY_BASE,
          result
        })
      }
    }
    ```

    - 在代码的开始,定义了一个空的接口 `IPersonState` 这样是为了能清楚的看懂 `ThunkAction`
      接收的参数,如果有项目需要用到这个接口,可以方便的在里面添加数据类型
    - 接着定义了用于简化 `ThunkAction` 返回类型的 `ThunkResult<R>`

      - `ThunkAction` 泛型一共接收四个参数
        - `R` 函数返回类型,在函数`queryBaseInfo`中,不需要返回数据,即 `R` 为 void
        - `IPersonState` 可看上面的说的作用
        - `undefined` 这个参数用于接收额外的参数,通常以用于启用浏览器插件之类的事情,此处暂时没用,所以赋值 `undefined` 即可
        - `Action<personGetInfoAction>` 第四个参数是 `action` 表明了即将派发的`action`的类型定义,因为我知道接下来这个 `action` 是用于派发服务器返回数据的类型和结果,所以定义为 `Action<personGetInfoAction>`

    - 接着是具体派发行为的实现
      - 和同步的派发`action`不同,使用 redux-thunk 中间件派发异步`action`不是直接派发`action`对象,而是返回一个匿名函数,这个函数接收一个名为`dispatch`的参数,在匿名函数处理好异步逻辑后,由参数`dispatch`向 reducer 派发`action`对象

  - reducer 接收 actionCreator 派发过来的对象,进行状态的更新

    ```typescript
    import { Reducer } from 'redux'
    import { personInfo, personGetInfoAction, personActionType } from '../type'

    export interface PersonState {
      baseInfo?: personInfo
    }

    let init_state: PersonState = {
      baseInfo: undefined
    }

    const person: Reducer<PersonState | undefined, personGetInfoAction> = (
      state = init_state,
      action: personGetInfoAction
    ) => {
      let newState = JSON.parse(JSON.stringify(state))

      switch (action.type) {
        case personActionType.PERSON_QUERY_BASE:
          let { code, data } = action.result
          if (code === 0) {
            newState.baseInfo = data
          }
          break
      }
      return newState
    }

    export default person
    ```

    - 前面的代码应该都能看懂,定义了`state`的类型以及初始化 state
    - 接着定义了 类型为`Reducer`名为`person` 的函数
      - 类型 `Reducer`接收两个泛型参数
        - 第一个是`state`,用于表明函数接收的`state`参数的类型以及最后返回`state`的类型
        - 第二个参数用于表明函数从`actionCreator`接收到的`action`
      - 在函数`person`中的业务逻辑就不详细说明了,都是一些简单处理 `state`之后返回新`state`的逻辑

  - `configReducer.ts`

    - ```typescript
      import { combineReducers } from 'redux'
      import person, { PersonState } from './person'

      export interface AllState {
        person?: PersonState
      }

      let rootReducer = combineReducers<AllState, any>({
        person,
        course
      })

      export default rootReducer
      ```

    - 这个文件主要是用于把多个 `reducer`合并为一个,同时也可以进行一些其他的处理,暂时我还没用到其他的处理,以后用到再更新

  - `store.js`

    - ```typescript
      import { createStore, applyMiddleware } from 'redux'
      import reduxThunk, { ThunkMiddleware } from 'redux-thunk'
      import rootReducer from './reducer/index'
      import { PersonState, personGetInfoAction } from './type'

      interface OtherState {}

      interface OtherAction {}

      type State = PersonState & OtherState
      type Actions = personGetInfoAction & OtherAction

      const store = createStore(
        rootReducer,
        applyMiddleware(reduxThunk as ThunkMiddleware<State, Actions>)
      )
      export default store
      ```

    - 用于生成最后项目中用到的总的 store ,代码应该不难看懂,不就详细解析了

  - `Info.tsx`

    ```typescript
    import React, { MouseEvent } from 'react'
    /* 第三方模块 */
    import { withRouter, RouteComponentProps } from 'react-router-dom'
    import { connect } from 'react-redux'
    import { Button } from 'antd'

    /* 业务逻辑模块 */
    import action from '../../store/action'
    import { exitLogin } from '../../api/person'

    interface propFormDispatch {
      queryInfo: () => void
    }

    export type ApplicationProps = RouteComponentProps & propFormDispatch

    class Info extends React.Component<ApplicationProps, InfoState> {
      async componentDidMount() {
        await this.props.queryInfo()
      }

      public render() {
        return <div>// 业务逻辑</div>
      }
    }

    const mapState2Props = (state: InfoState) => {
      return {}
    }

    const mapDispatchToProps = {
      queryInfo: action.person.queryBaseInfo
    }

    export default withRouter(
      connect(
        mapState2Props,
        mapDispatchToProps
      )(Info)
    )
    ```

    - 这个文件其他的东西不就解析了
    - 主要用到了两个函数 `mapStateToProps`和`mapDispatchToProps`
      通过 `connect` 函数把 `redux` 中获取的的 `state`挂载到 `props` 中

    - 因为使用到了`react-router-dom`进行组件的跳转,所以使用了`RouteComponentProps`把 `history`等属性挂载到 `prop`上

    最后导出经过`widthRouter`和`connect`高阶后的组件

  - `App.tsx`

    ```typescript
    import React from 'react'
    import { hot } from 'react-hot-loader'
    import { Provider } from 'react-redux'
    import store from './store/index'

    const App: React.FC = () => {
      return (
        <div className='App'>
          <Provider store={store}></Provider>
        </div>
      )
    }

    export default hot(module)(App)
    ```

    - 这里主要用到 `Provider` 把 store 挂载在 `react`实例上
    - 同时也因为使用了 `react-hot-loader` 实现开发的热加载,最后使用了高阶处理导出组件

- 登录逻辑

  - 首次进入 person 页
    - 生命周期
      - constructor
        - 设置 state 状态未登录
    - 检测是否登录 ->向服务器发送请求检测登录 -> 根据返回的 code 设定本组件的 isloin 状态
    - 根据 islogin 跳转到不同页面
      - islogin == true
        - 跳转到 info 页面 -> `Info`组件
          - 显示用户个人信息
            - 退出登录
              - 向服务器发送退出登录请求
                - 跳转到个人信息页面 ->再次检测是否登录 -> 这次因为只是在 person 组件内部切换,需要使用 willUpdate 获取用户登录信息
      - islogin == false
        - 跳转到提示页面 -> `Tip`组件
          - 点击登录按钮
            - 跳转到登录页面 -> `Login` 组件
            - 输入用户名密码 -> 向服务器发送登录请求
              - 成功 -> 跳转到个人信息页面
                - `this.props.histroy.push('/person/info)`
                - `Info 组件`
                  - componentWillUpdate
              - 失败 -> 提示用户重新输入

- 注册逻辑

  - 遇到的困难
    - 刚开始的时候我想到注册的逻辑
    - 注册就完成对新注册用户的登录
    - 向服务器发送新用户的用户名信息
    - 获取响应数据后更新 `redux` 中的用户信息
    - 跳转到用户信息页
    - 上面说的逻辑有点问题,因为根据 `info` 组件写的逻辑信息,如果之前已经有用户登录了,那么存储 `baseInfo` 的属性是非空的,那么`info`组件就不会重新获取 更新 `redux` 中存储的 `baseInfo` 信息
    - 然后我就想,是不是需要在 `register`组件中直接更新 `baseInfo`呢,后来灵光一闪,发现可以不用这么复杂的处理,
      - 当用户进入到注册页时,直接修改`redux`的 `isLogin`状态为`false`,
      - 重新向服务器请求一次`baseInfo`中的数据
      - 设置 `islogin`为`true`
      - 因为更新了 `redux` 中的数据,所以会在跳转到`info`组件时重新渲染
  - 总结

    - 其实这个功能不算难实现,主要是思路需要理解清晰就可以了
    - 新用户注册完毕时,因为 `redux`中的数据没有更新,所以用户看到的信息还是之前所存储的信息,在注册完成后
      - 重新向服务器请求新用户信息,并且设置登录状态为`true`即可

  - 再次总结,上面说得都其实都不对,都是自己想多了
    - 逻辑就是很简单的
      - 注册完成后 -> 使用`login`函数进行登录 -> 向服务器请求成功并响应 -> 重新向服务器获取新用户的个人信息数据并存储到 redux 中 -> 最后设置用户登录状态为`true`

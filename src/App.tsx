import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import NavTop from './component/NavTop'
import NavBottom from './component/NavBottom'
import Home from './routes/Home'
import Person from './routes/Person'
import Mycourse from './routes/Mycourse'
import store from './store/index'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <HashRouter>
          <div>
            <NavTop />
            {/* Main=>router */}
            <main className='container'>
              <Switch>
                <Route path='/' exact component={Home} />
                {/* 默认就是课程首页，所以设置根目录和/course都制定为Home组件 */}
                <Route path='/course' component={Home} />
                <Route path='/mycourse' component={Mycourse} />
                <Route path='/person' component={Person} />
                <Redirect to='/?from=404' />
              </Switch>
            </main>
            <NavBottom />
          </div>
        </HashRouter>
      </Provider>
    </div>
  )
}

export default hot(module)(App)

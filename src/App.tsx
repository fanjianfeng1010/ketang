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
                <Route path='/course' component={Home} />
                <Route path='/mycourse' component={Mycourse} />
                <Route path='/person' component={Person} />
                {/* 在其他不存在的地址时,直接跳转到首页 */}
                <Redirect to='/course' />
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

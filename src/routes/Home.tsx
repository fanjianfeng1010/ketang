import * as React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import List from './course/List'
import Info from './course/Info'

export interface IAppProps {}

export type HomeProps = IAppProps & RouteComponentProps

class Home extends React.Component<IAppProps> {
  public render() {
    return (
      <section className='course-box'>
        <Switch>
          <Route path='/course' exact component={List} />
          <Route path='/course/info' component={Info} />
        </Switch>
      </section>
    )
  }
}

export default Home

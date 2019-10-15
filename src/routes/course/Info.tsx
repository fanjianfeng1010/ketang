import React, { Component } from 'react'
import { connect } from 'react-redux'

export interface IAppProps {}

class App extends Component<IAppProps> {
  public render() {
    return <div>课程信息</div>
  }
}

const mapState2Props = (state: any) => {
  return {}
}

export default connect(mapState2Props)(App)

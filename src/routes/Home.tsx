import * as React from 'react'
import { connect } from 'react-redux'

export interface IAppProps {}
export interface HomeState {}

class Home extends React.Component<IAppProps> {
  public render() {
    return <div>首页</div>
  }
}

const mapState2Props = (state: HomeState) => {
  return {}
}

export default connect(mapState2Props)(Home)

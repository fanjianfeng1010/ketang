import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export interface INavBottomProps {}

export interface NavState {}

class NavBottom extends React.Component<INavBottomProps> {
  public render() {
    return <div></div>
  }
}

const mapState2Props = (state: NavState) => {
  return {}
}

export default withRouter(connect(mapState2Props)(NavBottom))

import * as React from 'react'
import { connect } from 'react-redux'

export interface IAppProps {}
export interface MyCourseState {}

class Mycourse extends React.Component<IAppProps> {
  public render() {
    return <div>我的课程</div>
  }
}

const mapState2Props = (state: MyCourseState) => {
  return {}
}

export default connect(mapState2Props)(Mycourse)

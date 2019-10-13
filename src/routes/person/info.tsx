import * as React from 'react'
import { connect } from 'react-redux'

export interface IInfoProps {}
export interface InfoState {}

class Info extends React.Component<IInfoProps> {
  public render() {
    return <div>个人信息</div>
  }
}

const mapState2Props = (state: InfoState) => {
  return {}
}

export default connect(mapState2Props)(Info)

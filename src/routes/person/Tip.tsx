import * as React from 'react'
import { connect } from 'react-redux'

export interface ITipProps {}
export interface TipState {}

class Tip extends React.Component<ITipProps> {
  public render() {
    return <div>未登录提示</div>
  }
}

const mapState2Props = (state: TipState) => {
  return {}
}

export default connect(mapState2Props)(Tip)

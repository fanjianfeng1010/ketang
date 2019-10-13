import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import { Alert, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export interface ITipProps {}
export interface TipState {}
export type ApplicationProps = ITipProps & RouteComponentProps

class Tip extends React.Component<ApplicationProps> {
  public render() {
    return (
      <div>
        <Alert
          type='warning'
          message='未登录提醒'
          description='还没登录,登录再操作吧'
        />
        <Button
          type='dashed'
          onClick={(ev: MouseEvent) => {
            this.props.history.push('/person/login')
          }}>
          立即登录
        </Button>
        <Button
          type='primary'
          onClick={(ev: MouseEvent) => {
            this.props.history.push('/person/register')
          }}>
          注册
        </Button>
      </div>
    )
  }
}

const mapState2Props = (state: TipState) => {
  return {}
}

export default withRouter(connect(mapState2Props)(Tip))

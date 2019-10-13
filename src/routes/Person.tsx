import * as React from 'react'
import { connect } from 'react-redux'
import { PersonState } from '../store/reducer/person'

export interface IPersonProps {}

class Person extends React.Component<IPersonProps> {
  public render() {
    return <div>个人</div>
  }
}

const mapState2Props = (state: PersonState) => {
  return {}
}

export default connect(mapState2Props)(Person)

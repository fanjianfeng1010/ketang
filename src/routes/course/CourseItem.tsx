import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AllState, Tmode, courseListData } from '../../store/type'
import { connect } from 'react-redux'
import action from '../../store/action/index'
import './courseItem.less'

interface Props {
  data: courseListData
  checkBox?: boolean
  handleSelect: (mode: Tmode) => void
}

class CourseItem extends Component<Props> {
  render() {
    let { data, checkBox = true } = this.props
    let { id, name, pic, dec, time, check } = data
    return (
      <li>
        {checkBox ? (
          <input
            type="checkbox"
            checked={check}
            onChange={(ev: any) => {
              this.props.handleSelect(id)
            }}
          />
        ) : (
          ''
        )}
        <Link
          to={{
            pathname: '/course/info',
            search: `?courseID=${id}`
          }}>
          <h3>{name}</h3>
          <div className="content">
            <div className="pic">
              <img src={pic} alt={dec} />
            </div>
            <div className="desc">
              <p>{dec}</p>
              <p>{time}</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

const mapState = (state: AllState) => {
  return {
    state: state.course
  }
}

const mapDispatch = {
  handleSelect: action.course.handleSelect
}

export default connect(
  mapState,
  mapDispatch
)(CourseItem)

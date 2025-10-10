import PropTypes from "prop-types"
import React, { Component } from "react"

export default class ClearBtn extends Component {

  handleClick = () => {
    this.props.handleClick()
  }

  render() {

    return (
      <button type="button" className="btn" onClick={this.handleClick} data-testid="clear-btn">Clear Complete</button>
    )
  }
}

ClearBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
}
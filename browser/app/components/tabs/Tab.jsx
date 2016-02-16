import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from 'styles/tabs/tab.css'

class Tab extends Component {
  render () {
    const { active, onChangeTab, onCloseTab, title } = this.props
    const className = active ? 'active-tab' : 'tab'

    return (
      <div onClick={onChangeTab} styleName={className}>
        <div styleName='tab-text'>{title}</div>
        <button onClick={onCloseTab}>
          <i className='material-icons'>clear</i>
        </button>
      </div>
    )
  }
}

export default cssModules(Tab, styles)

Tab.propTypes = {
  active: PropTypes.bool,
  onChangeTab: PropTypes.func.isRequired,
  onCloseTab: PropTypes.func.isRequired,
  title: PropTypes.string
}

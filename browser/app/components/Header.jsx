import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from 'styles/header.css'

class Header extends Component {
  render () {
    const {
      enableBack,
      onBack,
      title,
      url,
      enableForward,
      onForward,
      onHome
    } = this.props

    document.title = title

    return (
      <div styleName='header'>
        <div styleName='button-cell'>
          <button disabled={!enableBack()} onClick={onBack}>
            <i className='material-icons'>keyboard_arrow_left</i>
          </button>
          <button disabled={!enableForward()} onClick={onForward}>
            <i className='material-icons'>keyboard_arrow_right</i>
          </button>
          <button onClick={onHome}>
            <i className='material-icons'>home</i>
          </button>
        </div>
        <div styleName='title-cell'>
          {url}
        </div>
      </div>
    )
  }
}

export default cssModules(Header, styles)

Header.propTypes = {
  enableBack: PropTypes.func.isRequired,
  enableForward: PropTypes.func.isRequired,
  favicon: PropTypes.string,
  onBack: PropTypes.func,
  onForward: PropTypes.func,
  onHome: PropTypes.func,
  title: PropTypes.string,
  url: PropTypes.string
}

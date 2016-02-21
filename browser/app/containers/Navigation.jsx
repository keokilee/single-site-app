import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from 'browser/components/Header'

export default class Navigation extends Component {
  render () {
    const { favicon, webview, url, title } = this.props

    return (
      <Header
        enableBack={() => webview && webview.canGoBack()}
        enableForward={() => webview && webview.canGoForward()}
        favicon={favicon}
        onBack={e => webview.handleBack(e)}
        onForward={e => webview.handleForward(e)}
        onHome={() => webview.handleHome()}
        title={title}
        url={url}
      />
    )
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func,
  favicon: PropTypes.string,
  history: PropTypes.array,
  historyIndex: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.any,
  title: PropTypes.string,
  url: PropTypes.string,
  webview: PropTypes.any
}

function select ({ tabs }) {
  return tabs.tabs[tabs.tabIndex]
}

export default connect(select)(Navigation)

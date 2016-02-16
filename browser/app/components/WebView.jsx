import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import _ from 'lodash/function'

import styles from 'styles/webview.css'

const THROTTLE_PERIOD = 1000

class WebView extends Component {
  constructor () {
    super()
    this.state = {
      setListeners: false
    }
  }

  setTitle ({ title }) {
    this.props.setTitle(title)
  }

  faviconUpdated ({ favicons }) {
    this.props.setFavicon(favicons[0])
  }

  canGoBack () {
    return this._webView && this._webView.canGoBack()
  }

  canGoForward () {
    return this._webView && this._webView.canGoForward()
  }

  handleHome () {
    this._webView.setAttribute('src', this.props.initialUrl)
  }

  handleBack () {
    this._webView.goBack()
  }

  handleForward () {
    this._webView.goForward()
  }

  handleRefresh () {
    this._webView.reload()
  }

  handleStop () {
    this._webView.stop()
  }

  handleNavigation ({ url, isMainFrame }) {
    if (isMainFrame) {
      this.props.onChangeUrl(url)
    }
  }

  setWebview (webview) {
    if (this._webView || !webview) {
      return
    }

    if (!this.state.setListeners) {
      this.addListeners(webview)
      this.setState({ setListeners: true })
    }

    webview.addEventListener('dom-ready', () => {
      webview.removeEventListener('dom-ready')
      if (this._webView) {
        return
      }

      this._webView = webview
      this.props.setWebview(this)
    })
  }

  addListeners (webview) {
    const { setLoading } = this.props

    webview.addEventListener('page-title-set', this.setTitle.bind(this))
    webview.addEventListener('page-favicon-updated', _.throttle(this.faviconUpdated.bind(this), THROTTLE_PERIOD))
    webview.addEventListener('load-commit', this.handleNavigation.bind(this))
    webview.addEventListener('did-start-loading', _.throttle(setLoading.bind(this, true), THROTTLE_PERIOD))
    webview.addEventListener('did-finish-load', _.throttle(setLoading.bind(this, false), THROTTLE_PERIOD))
    webview.addEventListener('did-fail-load', _.throttle(setLoading.bind(this, false), THROTTLE_PERIOD))
  }

  render () {
    const { hidden, sessionNamespace, initialUrl } = this.props
    let styles = {}
    if (hidden) {
      styles.display = 'none'
    }

    return (
      <div styleName='webview' style={styles}>
        <webview
          autosize='on'
          nodeintegration='true'
          partition={'persist:' + sessionNamespace}
          ref={w => this.setWebview(w)}
          src={initialUrl}></webview>
      </div>
    )
  }
}

export default cssModules(WebView, styles)

WebView.propTypes = {
  canNavigate: PropTypes.func,
  hidden: PropTypes.bool,
  onChangeUrl: PropTypes.func.isRequired,
  sessionNamespace: PropTypes.string.isRequired,
  setFavicon: PropTypes.func,
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setWebview: PropTypes.func.isRequired,
  initialUrl: PropTypes.string.isRequired
}

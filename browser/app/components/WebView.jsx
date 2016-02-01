import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from 'styles/webview.css'

class WebView extends Component {
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

    this.addListeners(webview)

    webview.addEventListener('dom-ready', () => {
      webview.removeEventListener('dom-ready')
      this._webView = webview
      this.props.setWebview(this)
    })
  }

  addListeners (webview) {
    const { setLoading } = this.props

    webview.addEventListener('page-title-set', this.setTitle.bind(this))
    webview.addEventListener('page-favicon-updated', this.faviconUpdated.bind(this))
    webview.addEventListener('load-commit', this.handleNavigation.bind(this))
    webview.addEventListener('did-start-loading', setLoading.bind(this, true))
    webview.addEventListener('did-finish-load', setLoading.bind(this, false))
    webview.addEventListener('did-fail-load', setLoading.bind(this, false))
  }

  render () {
    const { hidden, sessionNamespace, url } = this.props
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
          src={url}></webview>
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
  url: PropTypes.string.isRequired
}

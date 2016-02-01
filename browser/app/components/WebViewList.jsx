import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'

import WebView from './WebView'
import styles from 'styles/webview.css'

class WebViewList extends Component {
  render () {
    const {
      tabs,
      tabIndex,
      setUrl,
      sessionNamespace,
      setFavicon,
      setLoading,
      setTitle,
      setWebview,
      url
    } = this.props

    return (
      <div styleName={tabs.length > 1 ? 'webviews--tabs' : 'webviews'}>
        {tabs.map((tab, index) => {
          return <WebView
            hidden={index !== tabIndex}
            key={tab.id}
            canNavigate={() => true}
            onChangeUrl={url => setUrl(url, index)}
            setWebview={c => setWebview(c, index)}
            sessionNamespace={sessionNamespace}
            setFavicon={i => setFavicon(i, index)}
            setLoading={l => setLoading(l, index)}
            setTitle={t => setTitle(t, index)}
            url={url} />
        })}
      </div>
    )
  }
}

export default cssModules(WebViewList, styles)

WebViewList.propTypes = {
  setUrl: PropTypes.func.isRequired,
  sessionNamespace: PropTypes.string.isRequired,
  setFavicon: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setWebview: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  url: PropTypes.string
}

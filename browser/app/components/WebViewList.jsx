import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'

import {
  setUrl,
  setWebview,
  setFavicon,
  setLoading,
  setTitle
} from 'app/actions'
import WebView from './WebView'
import styles from 'styles/webview.css'

class WebViewList extends Component {
  render () {
    const { dispatch, tabs, tabIndex, initialUrl, sessionNamespace } = this.props

    return (
      <div styleName={tabs.length > 1 ? 'webviews--tabs' : 'webviews'}>
        {tabs.map((tab, index) => {
          return <WebView
            hidden={index !== tabIndex}
            key={tab.id}
            canNavigate={() => true}
            onChangeUrl={url => dispatch(setUrl(url, index))}
            setWebview={c => dispatch(setWebview(c, index))}
            sessionNamespace={sessionNamespace}
            setFavicon={i => dispatch(setFavicon(i, index))}
            setLoading={l => dispatch(setLoading(l, index))}
            setTitle={t => dispatch(setTitle(t, index))}
            initialUrl={initialUrl} />
        })}
      </div>
    )
  }
}

WebViewList.propTypes = {
  dispatch: PropTypes.func,
  sessionNamespace: PropTypes.string,
  tabIndex: PropTypes.number,
  tabs: PropTypes.array,
  initialUrl: PropTypes.string
}

function mapStateToProps ({ tabs, config }) {
  return {
    sessionNamespace: config.sessionNamespace,
    initialUrl: config.url,
    tabs: tabs.tabs,
    tabIndex: tabs.tabIndex
  }
}

export default connect(mapStateToProps)(cssModules(WebViewList, styles))

import React, { Component, PropTypes } from 'react';

import WebView from './WebView';

export default class WebViewList extends Component {
  render() {
    const { tabs, tabIndex } = this.props;

    return (
      <div>
        {tabs.map((tab, index) => {
          <WebView
            hidden={index !== tabIndex}
            key={tab.id}
            canNavigate={url => true}
            onChangeUrl={url => dispatch(setUrl(url, index))}
            sessionNamespace={config.sessionNamespace}
            setFavicon={i => dispatch(setFavicon(i, index))}
            setLoading={l => dispatch(setLoading(l, index))}
            url={config.url}
          />
        })}
      </div>
    );
  }
}

// <WebView
//   canNavigate={url => canNavigate(url)}
//   onChangeUrl={url => dispatch(setUrl(url))}
//   ref={c => this._webView = c}
//   sessionNamespace={config.sessionNamespace}
//   setFavicon={i => dispatch(setFavicon(i))}
//   setLoading={l => dispatch(setLoading(l))}
//   url={config.url}
// />

import React, { Component, PropTypes } from 'react';

import WebView from './WebView';

export default class WebViewList extends Component {
  render() {
    const {
      tabs,
      tabIndex,
      setUrl,
      sessionNamespace,
      setFavicon,
      setLoading,
      setWebview,
      url
    } = this.props;
    console.log(tabs);

    return (
      <div>
        {tabs.map((tab, index) => {
          return <WebView
            hidden={index !== tabIndex}
            key={tab.id}
            canNavigate={url => true}
            onChangeUrl={url => setUrl(url, index)}
            setWebview={c => setWebview(c, index)}
            sessionNamespace={sessionNamespace}
            setFavicon={i => setFavicon(i, index)}
            setLoading={l => setLoading(l, index)}
            url={url}
          />;
        })}
      </div>
    );
  }
}

WebViewList.propTypes = {
  setUrl: PropTypes.func.isRequired,
  sessionNamespace: PropTypes.string.isRequired,
  setFavicon: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setWebview: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  url: PropTypes.string
};

// <WebView
//   canNavigate={url => canNavigate(url)}
//   onChangeUrl={url => dispatch(setUrl(url))}
//   ref={c => this._webView = c}
//   sessionNamespace={config.sessionNamespace}
//   setFavicon={i => dispatch(setFavicon(i))}
//   setLoading={l => dispatch(setLoading(l))}
//   url={config.url}
// />

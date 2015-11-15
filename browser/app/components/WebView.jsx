import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../styles/webview.css';

@CSSModules(styles)
export default class WebView extends Component {
  setTitle({ title }) {
    document.title = title;
  }

  faviconUpdated({ favicons }) {
    this.props.setFavicon(favicons[0]);
  }

  canGoBack() {
    return this._webView && this._webView.canGoBack();
  }

  canGoForward() {
    return this._webView && this._webView.canGoForward();
  }

  handleBack() {
    this._webView.goBack();
  }

  handleForward() {
    this._webView.goForward();
  }

  handleRefresh() {
    this._webView.reload();
  }

  handleStop() {
    this._webView.stop();
  }

  handleNavigation({ url, isMainFrame }) {
    if (isMainFrame) {
      this.props.onChangeUrl(url);
    }
  }

  componentDidMount() {
    const { setLoading } = this.props;

    this._webView.addEventListener('page-title-set', this.setTitle.bind(this));
    this._webView.addEventListener('page-favicon-updated', this.faviconUpdated.bind(this));
    this._webView.addEventListener('load-commit', this.handleNavigation.bind(this));
    this._webView.addEventListener('did-start-loading', setLoading.bind(this, true));
    this._webView.addEventListener('did-finish-load', setLoading.bind(this, false));
    this._webView.addEventListener('did-fail-load', setLoading.bind(this, false));
  }

  render() {
    const { sessionNamespace, url } = this.props;
    return (
      <div styleName='webview'>
        <webview
          autosize='on'
          partition={'persist:' + sessionNamespace}
          ref={c => this._webView = c}
          src={url}></webview>
      </div>
    );
  }
}

WebView.propTypes = {
  onChangeUrl: PropTypes.func.isRequired,
  sessionNamespace: PropTypes.string.isRequired,
  setFavicon: PropTypes.func,
  setLoading: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

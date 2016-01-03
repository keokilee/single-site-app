import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from 'styles/webview.css';

class WebView extends Component {
  setTitle({ title }) {
    this.props.setTitle(title);
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

  setWebview(newWebview) {
    if (this._webView || !newWebview) {
      return;
    }

    newWebview.addEventListener('dom-ready', () => {
      newWebview.removeEventListener('dom-ready');
      this._webView = newWebview;
      this.props.setWebview(this);
      this.addListeners();
    });
  }

  addListeners() {
    const { setLoading } = this.props;

    this._webView.addEventListener('page-title-set', this.setTitle.bind(this));
    this._webView.addEventListener('page-favicon-updated', this.faviconUpdated.bind(this));
    this._webView.addEventListener('load-commit', this.handleNavigation.bind(this));
    this._webView.addEventListener('did-start-loading', setLoading.bind(this, true));
    this._webView.addEventListener('did-finish-load', setLoading.bind(this, false));
    this._webView.addEventListener('did-fail-load', setLoading.bind(this, false));
  }

  render() {
    const { hidden, sessionNamespace, url } = this.props;
    let styles = {};
    if (hidden) {
      styles.display = 'none';
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
    );
  }
}

export default cssModules(WebView, styles);

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
};

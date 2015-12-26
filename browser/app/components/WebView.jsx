import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from 'styles/webview.css';
import { shell } from 'electron';

@CSSModules(styles)
export default class WebView extends Component {
  setTitle({ title }) {
    document.title = title;
  }

  faviconUpdated({ favicons }) {
    // this.props.setFavicon(favicons[0]);
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
      const { canNavigate } = this.props;
      console.log('navigating from ', this._webView.src, ' to ', url);
      if (this._webView.src !== url && !canNavigate(url)) {
        this._webView.stop();
        shell.openExternal(url);

        // SUCH A HACK!!!
        // Currently, there is no event to handle possibility of navigation.
        const original = this._webView.src;
        setTimeout(() => {
          this._webView.src = original;
        }, 1);

        return false;
      }
      this.props.onChangeUrl(url);
    }
  }

  setWebview(webview) {
    if (this._webView) {
      return;
    }

    this._webView = webview;
    this.props.setWebview(webview);
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
          ref={c => this.setWebview(c)}
          src={url}></webview>
      </div>
    );
  }
}

WebView.propTypes = {
  canNavigate: PropTypes.func,
  hidden: PropTypes.bool,
  onChangeUrl: PropTypes.func.isRequired,
  sessionNamespace: PropTypes.string.isRequired,
  setFavicon: PropTypes.func,
  setLoading: PropTypes.func.isRequired,
  setWebview: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

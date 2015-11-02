import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../styles/webview.css';

@CSSModules(styles)
export default class WebView extends Component {
  setTitle({ title }) {
    document.title = title;
  }

  canGoBack() {
    if (this._webView) {
      return this._webView.canGoBack();
    }

    return false;
  }

  canGoForward() {
    if (this._webView) {
      return this._webView.canGoForward();
    }

    return false;
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

  handleNavigation({ url, isMainFrame }) {
    if (isMainFrame) {
      this.props.onChangeUrl(url);
    }
  }

  componentDidMount() {
    const DOMNode = this._webView;

    DOMNode.addEventListener('page-title-set', this.setTitle.bind(this));
    DOMNode.addEventListener('load-commit', this.handleNavigation.bind(this));
  }

  render() {
    return (
      <div styleName='webview'>
        <webview
          autosize='on'
          partition={'persist:' + this.props.sessionNamespace}
          ref={c => this._webView = c}
          src={this.props.url}></webview>
      </div>
    );
  }
}

WebView.propTypes = {
  onChangeUrl: PropTypes.func.isRequired,
  sessionNamespace: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

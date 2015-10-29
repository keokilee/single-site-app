import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';

import styles from '../styles/webview.css';

@CSSModules(styles)
export default class WebView extends Component {
  setTitle({ title }) {
    document.title = title;
  }

  handleBack() {
    const DOMNode = ReactDOM.findDOMNode(this);
    DOMNode.goBack();
  }

  handleNavigation({ url, isMainFrame }) {
    if (isMainFrame) {
      this.props.onChangeUrl(url);
    }
  }

  componentDidMount() {
    const DOMNode = ReactDOM.findDOMNode(this);

    DOMNode.addEventListener('page-title-set', this.setTitle.bind(this));
    DOMNode.addEventListener('load-commit', this.handleNavigation.bind(this));
  }

  render() {
    return (
      <webview
        autosize='on'
        minheight='800'
        minwidth='600'
        src={this.props.url}
        styleName='webview'>
      </webview>
    );
  }
}

WebView.propTypes = {
  onChangeUrl: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

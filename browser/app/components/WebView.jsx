import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class WebView extends Component {
  setTitle({ title }) {
    document.title = title;
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
    return (<webview autosize='on' src={this.props.url}></webview>);
  }
}

WebView.propTypes = {
  onChangeUrl: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

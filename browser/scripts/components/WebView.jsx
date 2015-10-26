import React from 'react';
import ReactDOM from 'react-dom';

export default class WebView extends React.Component {
  setTitle({ title }) {
    document.title = title;
  }

  handleNavigation({ url, isMainFrame }) {
    console.log(url);
  }

  componentDidMount() {
    const DOMNode = ReactDOM.findDOMNode(this);

    DOMNode.addEventListener('page-title-set', this.setTitle);
    DOMNode.addEventListener('load-commit', this.handleNavigation);
  }

  render() {
    return (<webview autosize='on' src={this.props.url}></webview>);
  }
}

WebView.propTypes = { url: React.PropTypes.string };

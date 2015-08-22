import React from 'react';

export default class WebView extends React.Component {
  setTitle(event) {
    document.title = event.title;
  }

  componentDidMount() {
    React.findDOMNode(this).addEventListener('page-title-set', this.setTitle);
  }

  render() {
    return (<webview autosize='on' src={this.props.url}></webview>);
  }
}

WebView.propTypes = { url: React.PropTypes.string };

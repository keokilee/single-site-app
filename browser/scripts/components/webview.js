import React from 'react';

export default class WebView extends React.Component {
  render() {
    return (<webview autosize='on' minheight='800' minwidth='1200' src={this.props.url}></webview>);
  }
}

WebView.propTypes = { url: React.PropTypes.string };

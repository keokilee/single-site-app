import React from 'react';

export default class WebView extends React.Component {
  render() {
    return (<webview src={this.props.url} autosize='on' minwidth='1200' minheight='800'></webview>);
  }
}

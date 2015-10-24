import React from 'react';
import ReactDOM from 'react-dom';

export default class WebView extends React.Component {
  setTitle(event) {
    document.title = event.title;
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('page-title-set', this.setTitle);
  }
  render() {
    return (<webview autosize='on' src={this.props.url}></webview>);
  }
}

WebView.propTypes = { url: React.PropTypes.string };

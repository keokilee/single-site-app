'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import WebView from './components/webview';

class App extends React.Component {
  render() {
    return <WebView url='http://www.github.com' />;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

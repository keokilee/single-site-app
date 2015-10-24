/* @flow */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import WebView from './components/webview';

ReactDOM.render(
  <WebView url='http://www.github.com' />,
  document.getElementById('app')
);

'use strict';

import React from 'react';
import WebView from './components/webview';

export let __hotReload = true;

React.render(
  <WebView/>,
  document.getElementById('content')
);

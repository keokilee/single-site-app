'use strict';

import React from 'react';

React.render(<p>Electron version is {process.versions['electron-prebuilt']}</p>,
  document.getElementById('content'));

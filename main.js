'use strict';

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('./build/app/app.bundle.js');
}

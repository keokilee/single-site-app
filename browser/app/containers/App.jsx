import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import WebView from '../components/WebView';

import { setUrl, setLoading, setFavicon } from '../actions';

import config from '../config';
import whitelist from '../whitelist';

export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    const canNavigate = whitelist(config.whitelist);

    return (
      <div styleName='app'>
        <Navigation webview={this._webView} />
        <WebView
          canNavigate={url => canNavigate(url)}
          onChangeUrl={url => dispatch(setUrl(url))}
          ref={c => this._webView = c}
          sessionNamespace={config.sessionNamespace}
          setFavicon={i => dispatch(setFavicon(i))}
          setLoading={l => dispatch(setLoading(l))}
          url={config.url}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

function select(state) {
  return {};
}

export default connect(select)(App);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WebView from '../components/WebView';

import { setUrl } from '../actions';

export default class App extends Component {
  render() {
    const { dispatch, initialUrl, currentUrl } = this.props;

    return (
      <div style={{ overflow: 'auto' }}>
        <Header
          onBackButton={e => this._webView.handleBack(e)}
          url={currentUrl}
        />
      <div style={{ width: '100%', height: '100%' }}>
          <WebView
            onChangeUrl={url => dispatch(setUrl(url))}
            ref={c => this._webView = c}
            url={initialUrl}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  initialUrl: PropTypes.string.isRequired
};

function select(state) {
  return {
    initialUrl: state.initialUrl,
    currentUrl: state.currentUrl
  };
}

export default connect(select)(App);

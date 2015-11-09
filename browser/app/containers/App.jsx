import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WebView from '../components/WebView';

import { setUrl, setLoading } from '../actions';

import config from '../config';

export default class App extends Component {
  render() {
    const { dispatch, initialUrl, history, loading } = this.props;
    const currentUrl = history[history.length - 1];

    return (
      <div styleName='app'>
        <Header
          enableBack={() => this._webView && this._webView.canGoBack()}
          enableForward={() => this._webView && this._webView.canGoForward()}
          loading={loading}
          onBack={e => this._webView.handleBack(e)}
          onForward={e => this._webView.handleForward(e)}
          onRefresh={e => this._webView.handleRefresh(e)}
          onStop={e => this._webView.handleStop(e)}
          url={currentUrl}
        />
        <WebView
          onChangeUrl={url => dispatch(setUrl(url))}
          ref={c => this._webView = c}
          sessionNamespace={config.sessionNamespace}
          setLoading={l => dispatch(setLoading(l))}
          url={initialUrl}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.array.isRequired,
  initialUrl: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

function select(state) {
  return {
    initialUrl: state.initialUrl,
    history: state.history,
    loading: state.loading
  };
}

export default connect(select)(App);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WebView from '../components/WebView';

import { setUrl, setLoading, setFavicon } from '../actions';

import config from '../config';
import whitelist from '../whitelist';

export default class App extends Component {
  render() {
    const { dispatch, loading, favicon, navigation } = this.props;
    const canNavigate = whitelist(config.whitelist);
    const { history, currentIndex } = navigation;
    const url = history[currentIndex] ? history[currentIndex].url : '';

    return (
      <div styleName='app'>
        <Header
          enableBack={() => this._webView && this._webView.canGoBack()}
          enableForward={() => this._webView && this._webView.canGoForward()}
          favicon={favicon}
          loading={loading}
          onBack={e => this._webView.handleBack(e)}
          onForward={e => this._webView.handleForward(e)}
          onRefresh={e => this._webView.handleRefresh(e)}
          onStop={e => this._webView.handleStop(e)}
          url={url}
        />
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
  dispatch: PropTypes.func,
  favicon: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.any
};

function select(state) {
  return {
    loading: state.loading,
    navigation: state.navigation,
    favicon: state.favicon
  };
}

export default connect(select)(App);

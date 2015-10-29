import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Header from '../components/Header';
import WebView from '../components/WebView';

import { setUrl } from '../actions';
import styles from '../styles/app.css';

@CSSModules(styles)
export default class App extends Component {
  render() {
    const { dispatch, initialUrl, currentUrl, canGoBack } = this.props;

    return (
      <div styleName='app'>
        <Header
          enableBack={canGoBack}
          onBackButton={e => this._webView.handleBack(e)}
          url={currentUrl}
        />
        <WebView
          onChangeUrl={url => dispatch(setUrl(url))}
          ref={c => this._webView = c}
          url={initialUrl}
        />
      </div>
    );
  }
}

App.propTypes = {
  canGoBack: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  initialUrl: PropTypes.string.isRequired
};

function select(state) {
  return {
    initialUrl: state.initialUrl,
    currentUrl: state.currentUrl,
    canGoBack: state.canGoBack
  };
}

export default connect(select)(App);

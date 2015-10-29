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
    const { dispatch, initialUrl, currentUrl, history } = this.props;
    const canGoBack = history.length > 1;

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
  currentUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.array.isRequired,
  initialUrl: PropTypes.string.isRequired
};

function select(state) {
  return {
    initialUrl: state.initialUrl,
    currentUrl: state.currentUrl,
    history: state.history
  };
}

export default connect(select)(App);

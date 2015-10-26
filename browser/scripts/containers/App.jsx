import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WebView from '../components/WebView';

export default class App extends Component {
  render() {
    const { initialUrl, currentUrl } = this.props;

    return (
      <div>
        <Header url={currentUrl} />
        <WebView url={initialUrl} />
      </div>
    );
  }
}

App.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  initialUrl: PropTypes.string.isRequired
};

function select(state) {
  return {
    initialUrl: state.initialUrl,
    currentUrl: state.currentUrl
  };
}

export default connect(select)(App);

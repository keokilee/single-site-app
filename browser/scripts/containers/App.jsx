import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WebView from '../components/WebView';

export default class App extends Component {
  render() {
    const { currentUrl } = this.props;

    return (
      <WebView url={currentUrl} />
    );
  }
}

App.propTypes = {
  currentUrl: PropTypes.string.isRequired
};

function select(state) {
  return {
    currentUrl: state.currentUrl
  };
}

export default connect(select)(App);

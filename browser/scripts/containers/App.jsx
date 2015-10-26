import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WebView from '../components/WebView';

export default class App extends Component {
  render() {
    const { initialUrl } = this.props;

    return (
      <div>
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

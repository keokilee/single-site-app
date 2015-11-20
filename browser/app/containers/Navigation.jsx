import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'app/components/Header';

export default class Navigation extends Component {
  render() {
    const { loading, favicon, navigation, webview } = this.props;
    const { history, currentIndex } = navigation;
    const url = currentIndex > -1 ? history[currentIndex].url : '';

    return (
      <Header
        enableBack={() => webview && webview.canGoBack()}
        enableForward={() => webview && webview.canGoForward()}
        favicon={favicon}
        loading={loading}
        onBack={e => webview.handleBack(e)}
        onForward={e => webview.handleForward(e)}
        onRefresh={e => webview.handleRefresh(e)}
        onStop={e => webview.handleStop(e)}
        url={url}
      />
    );
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func,
  favicon: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.any,
  webview: PropTypes.any
};

function select({ loading, navigation, favicon }) {
  return {
    favicon,
    loading,
    navigation
  };
}

export default connect(select)(Navigation);

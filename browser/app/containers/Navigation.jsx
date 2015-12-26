import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'app/components/Header';

export default class Navigation extends Component {
  render() {
    const { loading, favicon, webview, history, historyIndex } = this.props;
    const url = historyIndex > -1 ? history[historyIndex].url : '';

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
  history: PropTypes.array,
  historyIndex: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.any,
  webview: PropTypes.any
};

function select({ tabs }) {
  const currentTab = tabs.tabs[tabs.tabIndex];

  return {
    favicon: currentTab.favicon,
    loading: !!currentTab.loading,
    webview: currentTab.webview,
    history: currentTab.history,
    historyIndex: currentTab.historyIndex
  };
}

export default connect(select)(Navigation);

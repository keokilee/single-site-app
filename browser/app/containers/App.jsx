import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Navigation from 'app/containers/Navigation';
import TabList from 'app/components/tabs/TabList';
import WebViewList from 'app/components/WebViewList';
import Menu from 'app/containers/Menu';

import config from 'app/config';

import {
  getConfig,
  addTab,
  removeTab,
  changeTab,
  setUrl,
  setLoading,
  setFavicon,
  setTitle,
  setWebview
} from 'app/actions';

import styles from 'styles/base.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getConfig());
  }

  render() {
    const { dispatch, tabIndex, tabs } = this.props;

    return (
      <div styleName='app'>
        <Menu />
        <Navigation />
        <TabList
          onAddTab={() => dispatch(addTab())}
          onChangeTab={(index) => dispatch(changeTab(index))}
          onRemoveTab={(index) => dispatch(removeTab(index))}
          tabIndex={tabIndex}
          tabs={tabs} />

        <WebViewList
          setUrl={(url, index) => dispatch(setUrl(url, index))}
          sessionNamespace={config.sessionNamespace}
          setFavicon={(favicon, index) => dispatch(setFavicon(favicon, index))}
          setLoading={(loading, index) => dispatch(setLoading(loading, index))}
          setTitle={(title, index) => dispatch(setTitle(title, index))}
          setWebview={(webview, index) => dispatch(setWebview(webview, index))}
          tabIndex={tabIndex}
          tabs={tabs}
          url={config.url}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  tabIndex: PropTypes.number,
  tabs: PropTypes.array
};

function select({ tabs }) {
  return {
    tabIndex: tabs.tabIndex,
    tabs: tabs.tabs
  };
}

export default cssModules(connect(select)(App), styles);

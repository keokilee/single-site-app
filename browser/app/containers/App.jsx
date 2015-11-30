import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Navigation from 'app/containers/Navigation';
import WebView from 'app/components/WebView';
import TabList from 'app/components/tabs/TabList';
import config from 'app/config';
import whitelist from 'app/whitelist';
import Menu from 'app/containers/Menu';

import {
  setUrl,
  setLoading,
  setFavicon,
  setWebview,
  addTab,
  removeTab,
  changeTab
} from 'app/actions';

import styles from 'styles/base.css';

@CSSModules(styles)
export class App extends Component {
  componentDidMount() {
    // Need to do first time init of the webview.
    this.props.dispatch(setWebview(this.createWebview()));
  }

  createWebview() {
    const { dispatch } = this.props;
    const canNavigate = whitelist(config.whitelist);

    return (
      <WebView
        canNavigate={url => canNavigate(url)}
        onChangeUrl={url => dispatch(setUrl(url))}
        sessionNamespace={config.sessionNamespace}
        setFavicon={i => dispatch(setFavicon(i))}
        setLoading={l => dispatch(setLoading(l))}
        url={config.url} />
    );
  }

  render() {
    const { dispatch, tabIndex, tabs } = this.props;
    const currentTab = tabs[tabIndex];
    const currentView = currentTab ? currentTab.webview : null;

    return (
      <div styleName='app'>
        <Menu />
        <Navigation />
        <TabList
          onAddTab={() => dispatch(addTab(this.createWebview()))}
          onChangeTab={(index) => dispatch(changeTab(index))}
          onRemoveTab={(index) => dispatch(removeTab(index))}
          tabIndex={tabIndex}
          tabs={tabs} />

        {currentView}
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

export default connect(select)(App);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Navigation from 'app/containers/Navigation';
import WebView from 'app/components/WebView';
import TabList from 'app/components/tabs/TabList';
import { setUrl, setLoading, setFavicon, addTab, removeTab, changeTab } from 'app/actions';
import config from 'app/config';
import whitelist from 'app/whitelist';
import Menu from 'app/containers/Menu';

import styles from 'styles/base.css';

@CSSModules(styles)
export class App extends Component {
  render() {
    const { dispatch, tabIndex, tabs } = this.props;
    const canNavigate = whitelist(config.whitelist);

    return (
      <div styleName='app'>
        <Menu />
        <Navigation webview={this._webView} />
        <TabList
          onAddTab={() => dispatch(addTab())}
          onChangeTab={(index) => dispatch(changeTab(index))}
          onRemoveTab={(index) => dispatch(removeTab(index))}
          tabIndex={tabIndex}
          tabs={tabs} />
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
  tabIndex: PropTypes.number,
  tabs: PropTypes.array
};

function select({ tabs }) {
  return {
    tabIindex: tabs.tabIndex,
    tabs: tabs.tabs
  };
}

export default connect(select)(App);

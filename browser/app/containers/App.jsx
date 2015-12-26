import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Navigation from 'app/containers/Navigation';
import TabList from 'app/components/tabs/TabList';
import Menu from 'app/containers/Menu';

import {
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

  render() {
    const { dispatch, tabIndex, tabs } = this.props;

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

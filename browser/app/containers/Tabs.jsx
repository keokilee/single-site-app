import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TabList from 'app/components/tabs/TabList';

export class Tabs extends Component {
  render() {
    const { tabIndex, tabs } = this.props;

    return (
      <TabList tabIndex={tabIndex} tabs={tabs} />
    );
  }
};

Tabs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired
};

function select({ tabs }) {
  return {
    tabIndex: tabs.tabIndex,
    tabs: tabs.tabs
  };
}

export default connect(select)(Tabs);

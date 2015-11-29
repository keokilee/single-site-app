import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TabList from 'app/components/tabs/TabList';
import { addTab, removeTab, changeTab } from 'app/actions';

export class Tabs extends Component {
  render() {
    const { dispatch, tabIndex, tabs } = this.props;

    return (
      <TabList
        onAddTab={() => dispatch(addTab())}
        onChangeTab={(index) => dispatch(changeTab(index))}
        onRemoveTab={(index) => dispatch(removeTab(index))}
        tabIndex={tabIndex}
        tabs={tabs} />
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

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from 'styles/tabs.css';

@CSSModules(styles)
export default class TabList extends Component {
  render() {
    const { tabs } = this.props;

    return (
      <div styleName='tabs'>
        {tabs.map((tab, index) =>
          <div>Tab {index + 1}</div>
        )}
      </div>
    );
  }
}

TabList.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired
};

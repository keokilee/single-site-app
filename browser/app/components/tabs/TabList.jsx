import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import Tab from 'app/components/tabs/Tab';
import styles from 'styles/tabs/tabs.css';

@CSSModules(styles)
export default class TabList extends Component {
  render() {
    const { tabIndex, tabs } = this.props;

    return (
      <div styleName='tabs'>
        {tabs.map((tab, index) =>
          <Tab
            active={tabIndex === index}
            key={index}
            title={`Tab ${index + 1}`}
          />
        )}

        <button styleName='add-button'>
          <i className='material-icons'>add</i>
        </button>
      </div>
    );
  }
}

TabList.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired
};

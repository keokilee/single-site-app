import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import Tab from 'app/components/tabs/Tab';
import styles from 'styles/tabs/tabs.css';

@CSSModules(styles, { allowMultiple: true })
export default class TabList extends Component {
  render() {
    const {
      onAddTab,
      onChangeTab,
      onRemoveTab,
      tabIndex,
      tabs
    } = this.props;

    const classes = classnames('tabs', {'hidden': tabs.length <= 1});

    return (
      <div styleName={classes}>
        {tabs.map((tab, index) =>
          <Tab
            active={tabIndex === index}
            key={index}
            onChangeTab={() => onChangeTab(index)}
            onCloseTab={() => onRemoveTab(index)}
            title={tab.title || 'Loading'}
          />
        )}

        <button onClick={onAddTab} styleName='add-button'>
          <i className='material-icons'>add</i>
        </button>
      </div>
    );
  }
}

TabList.propTypes = {
  onAddTab: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onRemoveTab: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired
};

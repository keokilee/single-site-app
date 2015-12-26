import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from 'styles/tabs/tab.css';

@CSSModules(styles)
export default class Tab extends Component {
  render() {
    const { active, onChangeTab, onCloseTab, title } = this.props;
    const className = active ? 'active-tab' : 'tab';

    return (
      <div onClick={onChangeTab} styleName={className}>
        <span>{title}</span>
        <button onClick={onCloseTab}>
          <i className='material-icons'>clear</i>
        </button>
      </div>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  onChangeTab: PropTypes.func.isRequired,
  onCloseTab: PropTypes.func.isRequired,
  title: PropTypes.string
};

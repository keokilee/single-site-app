import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import styles from 'styles/tabs/tab.css';

@CSSModules(styles, { allowMultiple: true })
export default class Tab extends Component {
  render() {
    const { active, onChangeTab, onCloseTab, title } = this.props;
    const classes = classnames('tab', active);

    return (
      <div onClick={onChangeTab} styleName={classes}>
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

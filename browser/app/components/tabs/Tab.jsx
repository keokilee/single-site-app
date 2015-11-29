import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import styles from 'styles/tabs/tab.css';

@CSSModules(styles, { allowMultiple: true })
export default class Tab extends Component {
  render() {
    const { title, active } = this.props;
    const classes = classnames('tab', {'active': active});

    return (
      <div styleName={classes}>
        <span>{title}</span>
        <button>
          <i className='material-icons'>clear</i>
        </button>
      </div>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string
};

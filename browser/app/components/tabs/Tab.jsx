import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import styles from 'styles/tabs.css';

@CSSModules(styles, { allowMultiple: true })
export default class Tab extends Component {
  render() {
    const { title, active } = this.props;
    const classes = classnames('tab', {'active': active});

    return (
      <div styleName={classes}>
        {title}
        <button>x</button>
      </div>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string
};
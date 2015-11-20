import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from 'styles/tabs.css';

@CSSModules(styles)
export default class Tab extends Component {
  render() {
    const { title } = this.props;

    return (
      <div styleName='tab'>
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

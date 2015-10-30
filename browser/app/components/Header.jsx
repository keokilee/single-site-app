import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../styles/header.css';

@CSSModules(styles)
export default class Header extends Component {
  render() {
    const { enableBack, onBack, onRefresh, url } = this.props;

    return (
      <div styleName='header'>
        <div styleName='button-cell'>
          <button disabled={!enableBack()} onClick={onBack}>
            <i className='material-icons'>keyboard_arrow_left</i>
          </button>
          <button onClick={onRefresh}>
            <i className='material-icons'>refresh</i>
          </button>
        </div>
        <div styleName='title-cell'>{url}</div>
      </div>
    );
  }
}

Header.propTypes = {
  enableBack: PropTypes.func,
  onBack: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  url: PropTypes.string
};

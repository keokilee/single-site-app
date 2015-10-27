import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../styles/header.css';

@CSSModules(styles)
export default class Header extends Component {
  render() {
    return (
      <div styleName='header'>
        <div styleName='button-cell'>
          <button onClick={this.props.onBackButton}>
            <i className='material-icons'>keyboard_arrow_left</i>
          </button>
        </div>
        <div styleName='title-cell'>{this.props.url}</div>
      </div>
    );
  }
}

Header.propTypes = {
  onBackButton: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

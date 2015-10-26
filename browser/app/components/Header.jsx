import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../styles/header.css';
console.log(styles);

@CSSModules(styles)
export default class Header extends Component {
  render() {
    return (
      <div styleName='header'>
        <button onClick={this.props.onBackButton}>
          <i className='material-icons'>keyboard_arrow_left</i>
        </button>
        <h3>{this.props.url}</h3>
      </div>
    );
  }
}

Header.propTypes = {
  onBackButton: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

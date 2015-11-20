import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from 'styles/header.css';

@CSSModules(styles)
export default class Header extends Component {
  render() {
    const {
      enableBack,
      onBack,
      onRefresh,
      onStop,
      url,
      enableForward,
      loading,
      onForward
    } = this.props;

    return (
      <div styleName='header'>
        <div styleName='button-cell'>
          <button disabled={!enableBack()} onClick={onBack}>
            <i className='material-icons'>keyboard_arrow_left</i>
          </button>
          <button disabled={!enableForward()} onClick={onForward}>
            <i className='material-icons'>keyboard_arrow_right</i>
          </button>
          <button hidden={loading} onClick={onRefresh}>
            <i className='material-icons'>refresh</i>
          </button>
          <button hidden={!loading} onClick={onStop}>
            <i className='material-icons'>clear</i>
          </button>
        </div>
        <div styleName='title-cell'>
          {url}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  enableBack: PropTypes.func.isRequired,
  enableForward: PropTypes.func.isRequired,
  favicon: PropTypes.string,
  loading: PropTypes.bool,
  onBack: PropTypes.func,
  onForward: PropTypes.func,
  onRefresh: PropTypes.func,
  onStop: PropTypes.func,
  url: PropTypes.string
};

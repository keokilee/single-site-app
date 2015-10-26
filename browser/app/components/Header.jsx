import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  styles() {
    return {
      backgroundColor: '#1A237E',
      color: '#EFEFEF',
      padding: '10px 15px'
    };
  }

  render() {
    return (
      <div style={this.styles()}>
        <button><i className='material-icons'>keyboard_arrow_left</i></button>
        <button><i className='material-icons'>keyboard_arrow_right</i></button>
        <h3 style={{ margin: 0, display: 'inline' }}>{this.props.url}</h3>
      </div>
    );
  }
}

Header.propTypes = {
  url: PropTypes.string.isRequired
};

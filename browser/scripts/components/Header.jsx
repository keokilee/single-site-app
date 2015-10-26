import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.url}</h1>
      </div>
    );
  }
}

Header.propTypes = {
  url: PropTypes.string.isRequired
};

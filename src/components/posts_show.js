import React, { Component } from 'react';
import { Link } from 'react-router';

export default
class PostsShow extends Component {
  render() {
    return (
      <div>
        This is {this.props.params.id}
      </div>
    );
  }
}

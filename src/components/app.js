import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        Blogging Stuff
        {this.props.children}
      </div>
    );
  }
}

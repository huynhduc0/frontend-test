import React, { Component } from 'react';

import { BrowserRouter } from "react-router-dom";
import Direction from './redirect/Direction';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        role: localStorage.getItem('role')
    }
}
 
  render() {
    return (
      <BrowserRouter>
          <Direction/>
      </BrowserRouter>
    )
  }
}

export default App;
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../css/VocalShell.css';

class VocalShell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return(
      <div className="vocalshell">
        <div className="recording">
          <Button variant="danger">
            Record
          </Button>
        </div>
        <div className="shell">
          Terminal
        </div>
      </div>
    );
  }
}

export default VocalShell;
import React, { Component } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import '../css/Body.css';

import VocalShell from './VocalShell';

class Body extends Component {
  render() {
    return(
      <div className="body-content">
        <Card style={{ width: '80vw' }}>
          <Card.Body>
            <Tabs defaultActiveKey="shell" style={{ fontSize: 19, fontFamily: 'monospace' }}>
              <Tab eventKey="shell" title="Shell">
                <div className="vocalshell-wrapper">
                  <VocalShell />
                </div>
              </Tab>
              <Tab eventKey="logs" title="Logs">
              Log content
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Body;
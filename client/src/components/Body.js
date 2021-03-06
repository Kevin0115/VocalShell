import React, { Component } from 'react';
import { Card, Tabs, Tab, Table } from 'react-bootstrap';
import '../css/CommandLog.css';

import VocalShell from './VocalShell';
import Help from './Help';
import CommandLog from './CommandLog';

class Body extends Component {
  render() {
    return(
      <div className="body-content">
        <Card style={{ width: '80vw' }}>
          <Card.Body>
            <Tabs defaultActiveKey="shell">
              <Tab eventKey="shell" title="Shell">
                <div className="vocalshell-wrapper">
                  <VocalShell />
                </div>
              </Tab>
              <Tab eventKey="logs" title="Logs">
                <CommandLog />
              </Tab>
              <Tab eventKey="help" title="Help">
                <div className="helpshell-wrapper">
                  <Help />
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Body;
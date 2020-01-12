import React, { Component } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import '../App.css';

class Body extends Component {
  render() {
      return(
        <div className="body-content">
            <Card style={{ width: '80vw', height: "80vh" }}>
                <Card.Body>
                    <Tabs defaultActiveKey="main">
                        <Tab eventKey="shell" title="Shell">
                        Shell content
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
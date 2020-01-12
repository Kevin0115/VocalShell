import React, { Component } from 'react';
import { Card, Tabs, Tab, Table } from 'react-bootstrap';
import '../css/Help.css';

class Help extends Component {
  render() {
    return(
      <div className="help-content">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Shell Command</th>
                      <th>Vocal Command</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>cd</td>
                      <td>change directory</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>pwd</td>
                      <td>print working directory</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>ls</td>
                      <td>listing directory</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>rm</td>
                      <td>remove</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>mkdir</td>
                      <td>make directory</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>clear</td>
                      <td>clear</td>
                    </tr>
                  </tbody>
                </Table>
        </div>
              
    );
  }
}

export default Help;
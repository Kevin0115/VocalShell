import React, { Component } from 'react';
import '../App.css';

class CommandLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    }
    this.renderLogs = this.renderLogs.bind(this);
  }

  componentDidMount() {
    this.fetchLogs();
  }

  fetchLogs() {
    fetch('http://34.94.33.138:8080' + '/command_log', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({logs: json.content});
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  renderLogs() {
    return this.state.logs.map((item, index) => {
      return (
        <div key={index}>
          <div className="log">
            <span className="command">{item.cmd}&nbsp;</span>
            {item.date}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="logs-content">
        <div className="logs">
          {this.renderLogs()}
        </div>
      </div>
    );
  }
}

export default CommandLog;
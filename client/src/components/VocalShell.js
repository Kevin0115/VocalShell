import React, { Component } from 'react';
import Recorder from 'react-mp3-recorder';
import { Spinner } from 'react-bootstrap'
import ReactAudioPlayer from 'react-audio-player';
import '../css/VocalShell.css';

import blobToBuffer from 'blob-to-buffer';

const API_URL = 'http://05aca56f.ngrok.io';

class VocalShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobURL: '',
      blinkCursor: false,
      commandList: [],
      loading: false,
    };
    this.renderRecorder = this.renderRecorder.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
    setInterval(() => {
      this.setState({blinkCursor: !this.state.blinkCursor})
    }, 500);
  }

  onRecordingComplete = async (blob) => {
    blobToBuffer(blob, async (err, buffer) => {
      this.setState({loading: true});
      if (err) {
        console.error(err)
        return
      }
      if (this.state.blobURL) {
        window.URL.revokeObjectURL(this.state.blobURL)
      }
      this.setState({
        blobURL: window.URL.createObjectURL(blob)
      })

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result.replace(/^data:.+;base64,/, '');
        console.log(base64data);

        fetch(API_URL + '/terminal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            audio: base64data,
          })
        })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if (json.success) {
            this.state.commandList.push({
              cmd: json.input
            })
            this.state.commandList.push({
              cmd: json.output
            })
          } else {
            this.state.commandList.push({
              cmd: json.output
            })
          }
          this.setState({loading: false});
        })
        .catch((err) => {
          console.log('Error Transcribing Audio');
          this.setState({loading: false});
        })
      }
    })
  }

  onRecordingError = (err) => {
    if (this.state.blobURL) {
      window.URL.revokeObjectURL(this.state.blobURL)
    }
    this.setState({ blobURL: null })
  }

  renderCommands() {
    return this.state.commandList.map((item, index) => {
      return <p key={index}>> {item.cmd}</p>;
    })
  }

  renderRecorder() {
    if (this.state.loading) {
      return (
        <Spinner className="loading" animation="grow" />
      )
    } else {
      return (
        <Recorder
          onRecordingComplete={this.onRecordingComplete}
          onRecordingError={this.onRecordingError}
          style={{
            margin: '0 auto'
          }}
        />
      );
    }
  }

  render() {
    return(
      <div className="vocalshell">
        <div className="body">
          <div className="recording">
            <div className="instructions">
              Press and hold to record your command.
            </div>
            {this.renderRecorder()}
            {/* {this.state.blobURL && (
              <ReactAudioPlayer
                src={this.state.blobURL}
                controls
                style={{
                  minWidth: '500px'
                }}
              />
            )} */}
          </div>
          <div className="shell">
            <div className="topbar">
              <span className="red-dot"></span>
              <span className="yellow-dot"></span>
              <span className="green-dot"></span>
            </div>
            <div className="shell-body">
              {this.renderCommands()}
              > {this.state.blinkCursor ? '_' : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VocalShell;
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Recorder from 'react-mp3-recorder';
import ReactAudioPlayer from 'react-audio-player';
import '../css/VocalShell.css';

import blobToBuffer from 'blob-to-buffer';

// const speech = require('@google-cloud/speech');

// const client = new speech.SpeechClient();

class VocalShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobURL: '',
      blinkCursor: false,
      commandList: [
        {
          cmd: 'cd server',
        },
        {
          cmd: 'pwd'
        }
      ],
    };
  }

  componentDidMount() {
    console.log('mounted');
    setInterval(() => {
      this.setState({blinkCursor: !this.state.blinkCursor})
    }, 500);
  }

  onRecordingComplete = async (blob) => {
    blobToBuffer(blob, async (err, buffer) => {
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

      // const audioBytes = blob.toString('base64');

      // const audio = {
      //   content: audioBytes,
      // }

      // const config = {
      //   encoding: 'LINEAR16',
      //   sampleRateHertz: 16000,
      //   languageCode: 'en-US',
      // };
      // const request = {
      //   audio: audio,
      //   config: config,
      // };

      // // Detects speech in the audio file
      // const [response] = await client.recognize(request);
      // const transcription = response.results
      //   .map(result => result.alternatives[0].transcript)
      //   .join('\n');
      // console.log(`Transcription: ${transcription}`);

      console.log(this.state.blobURL)
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
      return <p>> {item.cmd}</p>;
    })
  }

  render() {
    return(
      <div className="vocalshell">
        <div className="body">
          <div className="recording">
            <div className="instructions">
              Press and hold to record your command.
            </div>
            <Recorder
              onRecordingComplete={this.onRecordingComplete}
              onRecordingError={this.onRecordingError}
              style={{
                margin: '0 auto'
              }}
            />
            {this.state.blobURL && (
              <ReactAudioPlayer
                src={this.state.blobURL}
                controls
                style={{
                  minWidth: '500px'
                }}
              />
            )}
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
var cmd = require('node-cmd');
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

exports.execute_command = async (req, res) => {
  try {
    // Creates a client
    const client = new speech.SpeechClient();

    const audioBytes = req.body.audio;

    console.log("Received audio");

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'MP3',
      sampleRateHertz: 48000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);

    var command = transcription.trim().split(" ");
    var dictionary = {
      pwd : ["print", "working", "directory"],
      cwd : ["current", "working", "directory"],
      ls : ["list", "files"],
      mkdir :  ["make", "directory"],
      rmdir : ["remove", "directory"],
      cd : ["change", "directory"],
      echo : ["echo"],
      cat : ["cat", "concatenate"],
    };
    console.log(command);

    if (compareInputToCommand(command, dictionary.pwd, 3) || compareInputToCommand(command, dictionary.cwd, 3)) {
      cmd.get(
        "pwd",
        function (err, data, stderr) {
          res.send({
            success: true,
            input: transcription,
            output: data,
          });
        }
      );
    } else if (compareInputToCommand(command, dictionary.ls, 2)) {
      cmd.get(
        "ls",
        function (err, data, stderr) {
          res.send({
            success: true,
            input: transcription,
            output: data
          });
        }
      );
    } else if (compareInputToCommand(command, dictionary.mkdir, 2)) {
      var dir_name = "";
      if (command.length > 2) {
        var dir_name = " \"" + command.slice(2, command.length).join(" ") + "\"";
      }
      cmd.get(
        "mkdir" + dir_name,
        function (err, data, stderr) {
          res.send({
            success: true,
            input: transcription,
            output: data
          });
        }
      );
    } else if (compareInputToCommand(command, dictionary.cd, 2)) {
      var dir_name = "";
      if (command.length > 2) {
        var dir_name = " \"" + command.slice(2, command.length).join(" ") + "\"";
      }
      console.log("cd" + dir_name);
      cmd.get(
        "cd" + dir_name,
        function (err, data, stderr) {
          console.log(err);
          console.log(stderr);
          res.send({
            success: true,
            input: transcription,
            output: data
          });
        }
      );
    } else {
      res.send({
        success: false,
        input: transcription,
        output: "Could not recognize command",
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      success:false,
      output: e,
    });
  }
}

var compareInputToCommand = (input, command, length) => {
  if (input.length < length) {
    return false;
  }
  for (var i = 0; i < length; i++)
  {
    if (input[i] !== command[i]) {
      return false;
    }
  }
  return true;
}

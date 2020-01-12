var cmd = require('node-cmd');
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

var cwd = null;
cmd.get(
  "pwd",
  function (err, data, stderr) {
    cwd = data;
  }
);
var lorem = "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"";

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

    var command = transcription.trim().toLowerCase().split(" ");
    var dictionary = {
      clear : ["clear",],
      pwd : ["print", "working", "directory"],
      cwd : ["current", "working", "directory"],
      ls : ["list", "files"],
      mkdir :  ["make", "directory"],
      rmdir : ["remove", "directory"],
      cd : ["change", "directory"],
      touch : ["touch"],
      create : ["create"],
      cat : ["cat"],
    };

    if (compareInputToCommand(command, dictionary.pwd, 3) || compareInputToCommand(command, dictionary.cwd, 3)) {
      cmd.get(
        "cd " + cwd + "\npwd",
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
        "cd " + cwd + "\nls",
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
        dir_name = " \"" + command.slice(2, command.length).join(" ") + "\"";
      }
      cmd.get(
        "cd " + cwd + "\nmkdir" + dir_name,
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
        if (command.length === 3 && command[2] === "back") {
          dir_name = " ..";
        } else {
          dir_name = " \"" + command.slice(2, command.length).join(" ") + "\"";
        }
      } else {
        res.send({
          success: true,
          input: transcription,
          output: "Please specify a directory"
        });
      }
      // console.log("cd" + dir_name);
      cmd.get(
        "cd " + cwd + "\ncd" + dir_name + "\npwd",
        function (err, data, stderr) {
          console.log(err);
          if (err == null) {
            cwd = data;
          }
          console.log("New cwd: " + cwd);
          res.send({
            success: true,
            input: transcription,
            output: data
          });
        }
      );
    } else if (compareInputToCommand(command, dictionary.clear, 1)) {
      res.send({
        success: true,
        input: transcription,
        output: "",
      });
    } else if (compareInputToCommand(command, dictionary.touch, 1) || compareInputToCommand(command, dictionary.create, 1)) {
      console.log("touch");
      var file_name = "";
      if (command.length > 2) {
        file_name = " \"" + command.slice(1, command.length).join(" ") + "\"";
      }
      console.log("cd " + cwd + "\ntouch" + file_name + "\necho " + lorem + ">> " + file_name);
      cmd.get(
        "cd " + cwd + "\ntouch" + file_name + "\necho " + lorem + ">> " + file_name,
        function (err, data, stderr) {
          res.send({
            success: true,
            input: transcription,
            output: data
          });
        }
      );
    } else if (compareInputToCommand(command, dictionary.cat, 1)) {
      console.log("cat");
      var file_name = "";
      if (command.length > 2) {
        file_name = " \"" + command.slice(1, command.length).join(" ") + "\"";
      }
      console.log("cd " + cwd + "\ncat" + file_name);
      cmd.get(
        "cd " + cwd + "\ncat" + file_name,
        function (err, data, stderr) {
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

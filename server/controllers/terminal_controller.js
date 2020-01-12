var cmd = require('node-cmd');

exports.execute_command = (req, res) => {
  var command = req.body.command.trim().split(" ");
  var dictionary = {
    pwd : ["print", "working", "directory"],
    ls : ["list", "files"],
  };
  console.log(command);

  if (compareInputToCommand(command, dictionary.pwd, 3)) {
    cmd.get(
      "pwd",
      function(err, data, stderr) {
        res.send({
          success: true,
          content: data
        });
      }
    );
  } else if (compareInputToCommand(command, dictionary.ls, 2)) {
    cmd.get(
      "ls",
      function(err, data, stderr) {
        res.send({
          success: true,
          content: data
        });
      }
    );
  } else {
    res.send({
      success: false,
      content: "Could not recognize the command"
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

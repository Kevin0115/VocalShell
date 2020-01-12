// const connection = require('../config/db_config');
// const moment = require('moment');

exports.get_all_logs = async (req, res) => {
  const dummyLogs = [
    {
      "date": "2020-01-11 12:00:00",
      "cmd": "cd"
    },
    {
      "date": "2020-01-11 11:01:02",
      "cmd": "ls"
    },
    {
      "date": "2020-01-11 12:00:00",
      "cmd": "cd"
    },
    {
      "date": "2020-01-11 13:01:43",
      "cmd": "git pull"
    },
    {
      "date": "2020-01-11 11:01:12",
      "cmd": "git push"
    },
    {
      "date": "2020-01-11 11:01:34",
      "cmd": "git diff"
    },
    {
      "date": "2020-01-11 03:01:34",
      "cmd": "cd Desktop"
    },
    {
      "date": "2020-01-11 04:01:57",
      "cmd": "git branch"
    },
    {
      "date": "2020-01-11 05:01:27",
      "cmd": "git status"
    },
    {
      "date": "2020-01-11 06:23:34",
      "cmd": "git stash"
    },
    {
      "date": "2020-01-11 07:49:59",
      "cmd": "git stash list"
    }
  ];
  
  res.send({
    content: dummyLogs
  });
}

// exports.create_logs = async (req, res) => {

// }

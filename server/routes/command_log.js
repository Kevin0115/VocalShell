var express = require('express');
var router = express.Router();

var log_controller = require('../controllers/command_log_controller');

router.get('/', log_controller.get_all_logs);

// router.post(`/`, log_controller.create_log);

module.exports = router;
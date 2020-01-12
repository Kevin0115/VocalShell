var express = require('express');
var router = express.Router();

var terminal_controller = require('../controllers/terminal_controller');

router.post('/', terminal_controller.execute_command);

module.exports = router;
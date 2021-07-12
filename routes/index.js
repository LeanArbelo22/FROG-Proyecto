var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index', {
    root: __dirname + "/public"
  });
});

module.exports = router;

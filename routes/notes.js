var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.get('/', function(req, res) {
  Note.find({}, function(err, notes) {
    if(err) {
      return res.status(500).json({ error: "Something went wrong!"});
    } else {
      return res.json(notes);
    }
  });
});

module.exports = router;

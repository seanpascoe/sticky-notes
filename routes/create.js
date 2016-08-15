var express = require('express');
var router = express.Router();
var Note = require('../models/note');


router.get('/', function(req, res) {
  res.render('create');
});



router.post('/', function(req, res) {
  new Note({
    title: req.body.title,
    content: req.body.content
  }).save( function(err, note) {
    if(err) {
      return res.status(500).json({ error: "Something went wrong!"});
    }
    return res.send(note);
  });
});

module.exports = router;

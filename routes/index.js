var express = require('express');
var router = express.Router();
var Note = require('../models/note');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sticky Notes' });
});

router.delete('/', function(req, res) {
  Note.findById(req.body.id, function(err, note) {
    note.remove();
    res.status(200).send({success: true});
  });
});

module.exports = router;

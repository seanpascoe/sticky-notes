var express = require('express');
var router = express.Router();
var Note = require('../models/note');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sticky Notes' });
});

/* Create new note */
router.post('/', function(req, res) {
  new Note({
    title: req.body.title,
    content: req.body.content
  }).save( function(err, note) {
    if(err) {
      return res.status(500).json({ error: "Something went wrong!"});
    }
    return res.status(200).send({success: true});
  });
});

/* Delete note */
router.delete('/', function(req, res) {
  Note.findById(req.body.id, function(err, note) {
    note.remove();
    res.status(200).send({success: true});
  });
});

/* Update note */
router.put('/', function(req, res) {
  Note.findByIdAndUpdate(
    req.body.id,
    { $set: { title: req.body.title, content: req.body.content }},
    function(err, note) {
      if(err) {
        console.log(err);
      }
      res.status(201).send({succes: true});
    }
  )
})

module.exports = router;

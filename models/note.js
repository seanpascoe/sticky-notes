var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Note = new Schema({
  title: {type: String, required: true},
  content: {type: String},
  complete: {type: Boolean, default: false}
});

module.exports = mongoose.model('Note', Note);

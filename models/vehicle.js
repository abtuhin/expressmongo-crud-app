var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vehicle = new Schema({
  trademark: {
    type    : String,
    require : true
  },
  model: {
    type    : String,
    enum    : ['formal', 'sport', 'adventure'],
    require : true
  },
  series: {
    type    : Number,
    require : true
  },
  created: {
    type    : Date,
    default : Date.now
  }
});

Vehicle.path('trademark').validate(function(v){
  return ((v!="") && (v!=null));
});

module.exports = mongoose.model('Vehicle', Vehicle);

var mongoose = require('mongoose');
module.exports = function(MongoUrl){
mongoose.connect(MongoUrl);
mongoose.Promise = global.Promise

  var WaiterSchema = mongoose.Schema({
    days: Array,
    name:String
  });

WaiterSchema.index({name:1}, {unique:true});
  var Waitor = mongoose.model('Waitor', WaiterSchema);

return {Waitor}
};

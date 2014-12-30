var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
    storename: {type: String, required: true, index: true, display: {help: 'This must be a unique name'}},
    desc: {type: String},
    add: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zipcode: {type: String}
});


/*compile schema to a model*/
var Store = mongoose.model('store', StoreSchema);

/*expose this variable to other js file */
module.exports = Store;

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productname: {type: String, required: true, index: true, display: {help: 'This must be a unique name'}},
    desc: {type: String},
    brand: {type: String}
});


/*compile schema to a model*/
var Product = mongoose.model('product', ProductSchema);

/*expose this variable to other js file */
module.exports = Product;

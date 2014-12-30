var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DealSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'user'},
    product: {type: mongoose.Schema.ObjectId, ref: 'product'},
    store: {type: mongoose.Schema.ObjectId, ref: 'store'},
    desc: {type: String},
    price: { type:Number}
});


/*compile schema to a model*/
var Deal = mongoose.model('deal', DealSchema);

/*expose this variable to other js file */
module.exports = Deal;

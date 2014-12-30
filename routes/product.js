var productschema=require('../models/product.js');
exports.index = function(req, res) {
	productschema.find( function(err, productslist){
    	if (err) res.json(err);
		else res.render('products', { title: 'product list',Products:productslist });
    }); 
};

exports.new = function(req, res) {
  res.render('addproduct', { title: 'adding a product'});
};

exports.create = function(req, res) {
   console.log(req.body);
   productschema.create(req.body, function(err, product) {
     if (err) console.log(err);
     res.render('addproduct', { title: 'adding a product'});
				}); 
};

exports.show = function(req, res) {
        productschema.findById(req.params.product,function(err, product){
        if (err) res.json(err);
		else res.render('product', { title: 'product info',selectedProduct:product });
    }); 
};

exports.edit = function(req, res) {
   return productschema.findById(req.params.product, function (err, product) {
	res.render('editproduct', { title: 'edit product info',selectedProduct:product});
    });
};

exports.update = function(req, res) {
          return productschema.findByIdAndUpdate(req.params.product, { $set:req.body }, function (err, updatedproduct) {
  	      if (err) return handleError(err);
          res.redirect('/products');
          });
};

exports.destroy = function(req, res) {
	return productschema.findById(req.params.product, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        res.redirect('/products');
      } else {
        console.log(err);
      }
    });
  });
};

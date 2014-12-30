var storeschema=require('../models/store.js');
exports.index = function(req, res) {
	storeschema.find( function(err, storeslist){
    	if (err) res.json(err);
		else res.render('stores', { title: 'stores list',Stores:storeslist });
    }); 
};

exports.new = function(req, res) {
  res.render('addstore', { title: 'adding a store'});
};

exports.create = function(req, res) {
   console.log(req.body);
   storeschema.create(req.body, function(err, store) {
     if (err) console.log(err);
     res.render('addstore', { title: 'adding a store'});
				}); 
};

exports.show = function(req, res) {
        storeschema.findById(req.params.store,function(err, store){
        if (err) res.json(err);
		else res.render('store', { title: 'store info',selectedStore:store });
    }); 
};

exports.edit = function(req, res) {
   return storeschema.findById(req.params.store, function (err, store) {
	res.render('editstore', { title: 'edit store info',selectedStore:store});
    });
};

exports.update = function(req, res) {
          return storeschema.findByIdAndUpdate(req.params.store, { $set:req.body }, function (err, updatedstore) {
  	      if (err) return handleError(err);
          res.redirect('/stores');
          });
};

exports.destroy = function(req, res) {
	return storeschema.findById(req.params.store, function (err, store) {
    return store.remove(function (err) {
      if (!err) {
        res.redirect('/stores');
      } else {
        console.log(err);
      }
    });
  });
};

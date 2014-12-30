var productschema=require('../models/product.js');
var storeschema=require('../models/store.js');
var userschema=require('../models/user.js');
var dealschema=require('../models/deal.js');

exports.index = function(req, res) {
    dealschema.find({}).populate('store').populate('product').populate('user').exec(function(err,dealslist) {
    if (err) res.json(err);
    else res.render('deals', { title: 'deals info',Deals:dealslist });
    });
};

exports.new = function(req, res) {
  res.render('adddeal',{title:'add deal',Storelist:storeschema.getstorelist() });
};

exports.create = function(req, res) {
  dealschema.create(req.body, function(err, deal) {
     if (err) console.log(err);
     res.redirect('/deals/new');
				});
};

exports.show = function(req, res) {
        dealschema.findOne({_id:req.params.deal}).populate('store').populate('product').populate('user').exec(function(err,deal) {
        if (err) res.json(err);
		else res.render('deal', { title: 'deal info',selectedDeal:deal });
    }); 
};

exports.edit = function(req, res) {

};

exports.update = function(req, res) {
          return dealschema.findByIdAndUpdate(req.params.deal, { $set:req.body }, function (err, updateddeal) {
  	      if (err) return handleError(err);
          res.redirect('/deals');
          });
};

exports.destroy = function(req, res) {
	return dealschema.findById(req.params.deal, function (err, deal) {
    return deal.remove(function (err) {
      if (!err) {
        res.redirect('/deals');
      } else {
        console.log(err);
      }
    });
  });
};

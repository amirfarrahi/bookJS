var userschema=require('../models/user.js');
exports.index = function(req, res) {
	userschema.find( function(err, userslist){
    	if (err) res.json(err);
		else res.render('users', { title: 'users list',Users:userslist });
    }); 
};

exports.new = function(req, res) {
  res.render('adduser', { title: 'adding a user'});
};

exports.create = function(req, res) {
   userschema.findOne({'username':req.body.username}, function (err, founduser) {
    	if (err) return next(err);
		var errormsg;
        if ( founduser!=null) {
			return res.render('adduser', { title: 'adding a user',err: 'User Already exist' });
		} else {
		    	userschema.create({username: req.body.username, password: req.body.username, email: req.body.email }, function(err, user) {
    				res.render('adduser', { title: 'adding a user'});
				}); 
		       }
	})
};

exports.show = function(req, res) {
        userschema.findById(req.params.user,function(err, user){
        if (err) res.json(err);
		else res.render('user', { title: 'user info',selectedUser:user });
    }); 
};

exports.edit = function(req, res) {
   return userschema.findById(req.params.user, function (err, user) {
	res.render('edituser', { title: 'edit user info',selectedUser:user});
    });
};

exports.update = function(req, res) {
          return userschema.findByIdAndUpdate(req.params.user, { $set:req.body }, function (err, updateduser) {
  	      if (err) return handleError(err);
          res.redirect('/users');
          });
};

exports.destroy = function(req, res) {
	return userschema.findById(req.params.user, function (err, user) {
    return user.remove(function (err) {
      if (!err) {
        res.redirect('/users');
      } else {
        console.log(err);
      }
    });
  });
};

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
//var emailm= require('../routes/emailmanager');
module.exports = function(passport) {

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {
    User.findOne({$or:[{ 'local.email' : email },{ 'local.username' : req.body.username }]}, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, false, req.flash('signupMessage', 'username/email already exist'));
        else { 
           var newUser = new User();
           newUser.local.email = email; 
           newUser.local.username= req.body.username;
           newUser.local.token=Math.floor((Math.random() * 100) + 54);
           newUser.local.password = newUser.generateHash(password);
      //     var link="http://"+req.get('host')+"/verify?id="+newUser.local.token;
           newUser.save(function(err) {
               if (err) throw err;
        //       req.to=newUser.local.email;
          //     req.subject='Please confirm this email';
           //    req.content= 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>';              //  emailm.sendEmail(req,res);
               
               return done(null, newUser);
           });
        }
    });
}));

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy({
// by default, local strategy uses username and password, we will override with email
usernameField : 'email',
passwordField : 'password',
passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
User.findOne({ 'local.email' : email }, function(err, user) {
// if there are any errors, return the error before anything else
if (err)
return done(err);
// if no user is found, return the message
if (!user)
return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
// if the user is found but the password is wrong
if (!user.validPassword(password))
return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
if (!user.local.verified)
return done(null, false, req.flash('loginMessage', 'Please verify your email.')); // create the loginMessage and save it to session as flashdata

// all is well, return successful user
return done(null, user);
});
}));
};

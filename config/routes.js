var emailm= require('../routes/emailmanager');
var user = require('../models/user');
var config= require('./config')();
var crypto=require('crypto');

module.exports = function(app, passport) {

app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
app.get("/login", function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

app.post("/login",passport.authenticate('local-login',{
  successRedirect : "/profile",
  failureRedirect : "/login",
  failureFlash: true})
);

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/confirmation', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

app.get('/confirmation', isLoggedIn, function(req, res) {
    var link="http://"+req.get('host')+"/verify/"+req.user.local.token;
    var subject='Please confirm this email';
    var to=req.user.local.email; 
    var content= 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>';
    emailm.sendEmail(to,subject,content,function (err,data){;
     if (data!=1)   res.render('signup.ejs', { message: 'mail server is down' });
     res.render('confirmation.ejs', { message: to });

    }); 
});
app.get('/verify/:id',function(req,res){
<<<<<<< HEAD
    var host=(process.env.BASE_IRI || config.host);
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
=======
//    var host='localhost:3506';
    if((req.protocol+"://"+req.get('host'))==("http://"+config.host))
>>>>>>> 13f300bcc2353888d7527e8b663b7d9e6ef3c593
    {
        console.log("Domain is matched. Information is from Authentic email");
        user.findOne({ 'local.token' : req.params.id }, function(err, user) {
        if (err)  res.end("error");
        if (!user) res.end("bad request");
        if (!user.verifed) {
            user.local.verified=true;
            user.save(function(err) { 
                if (err) throw err;
                res.render('verification.ejs');
            });
 
        
        }
        });
    } else res.end("<h1>Request is from unknown source");

});

app.get('/forgot', function(req, res) {
    //console.log(req.user);
    res.render('forgot.ejs',{message:''});

});

app.post('/forgot', function (req,res){
    var token = crypto.randomBytes(16).toString('hex');
    user.findOne({ 'local.email': req.body.email }, function(err, user) {
        if (!user) return res.render('forgot.ejs',{ message :'No account with that email address exists.'});
        console.log(user);
        user.local.resetPasswordToken = token;
        console.log(user.local.resetPasswordToken);
        user.local.resetPasswordExpires = Date.now() + 3600000;         
        user.save(function(err) {
            if (err) res.end("error");
            var passcon='You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +'http://' + req.get('host') + '/reset/' + token + '\n\n';
            emailm.sendEmail(user.local.email,'password reset',passcon,function (err,data){;
                if (data!=1)  res.render('forgot.ejs',{message:'main server is down'});
                res.render('forgot.ejs',{message: 'email contain instruction on how to reset your password sent to your address'});

            });
        });
    });
});

app.get('/reset/:id', function(req, res) {
 user.findOne({ 'local.resetPasswordToken': req.params.id, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
    if (err) res.end("error");
  
    console.log('gfgfgfgf'+user);
    if (!user)  res.render('forgot.ejs',{message:'Password reset token is invalid or has expired.'});
else
    res.render('updatepass.ejs',{mu:user.local.resetPasswordToken,message:''});

    });
});

app.post('/reset/:id', function(req, res) {
    user.findOne({ 'local.resetPasswordToken': req.params.id, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
        if (err) res.end("error");
    //       console.log(user);
        if (!user)  res.render('forgot.ejs',{message:'Password reset token is invalid or has expired.'});
        user.local.resetPasswordToken=null;
        user.local.resetPasswordExpires=null;
        user.local.password=user.generateHash(req.body.password);
        user.save(function(err) {
           if (err) res.end("error");
           res.render('updatepass.ejs',{mu:user.local.resetPasswordToken,message:'Password updated successfully'});
        });
    });
});

function isLoggedIn(req, res, next) {
// if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
// if they aren't redirect them to the home page
    res.redirect('/');
}

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
  });
}

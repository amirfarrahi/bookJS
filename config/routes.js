var emailm= require('../routes/emailmanager');
var user = require('../models/user');
var config= require('./config')();

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
    var link="http://"+req.get('host')+"/verify?id="+req.user.local.token;
    var subject='Please confirm this email';
    var to=req.user.local.email; 
    var content= 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>';
    emailm.sendEmail(req,res,to,subject,content);
    
}); 

app.get('/verify',function(req,res){
//    var host='localhost:3506';
    if((req.protocol+"://"+req.get('host'))==("http://"+config.host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        user.findOne({ 'local.token' : req.query.id }, function(err, user) {
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

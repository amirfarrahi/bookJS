var nodemailer = require("nodemailer");
var config= require('../config/config')();
var smtpTransport = nodemailer.createTransport("SMTP",{
service: config.mail.service,
auth: {
user: config.mail.username,
pass: config.mail.password
}
});
var rand,mailOptions,host,link;
exports.sendEmail=function (to,sub,cont,callback) {
// link="http://"+req.get('host')+"/verify?id="+rand;
mailOptions={
to : to,
subject : sub,
html: cont
// subject : "Please confirm your Email account",
// html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
}
// console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
if(error) return callback(new Error("An error has occured in mail server"));
callback(null,1);
 });
};

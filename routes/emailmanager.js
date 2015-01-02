var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail", 
    auth: {
        user: "amir.farrahi@gmail.com",
        pass: "jjatcbxlhthycgic"
    }
}); 
var rand,mailOptions,host,link;
exports.sendEmail=function (to,sub,cont,callback) {

   
  
  //  link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : to,
        subject : sub,
        html: cont
    //    subject : "Please confirm your Email account",
    //    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
//    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error) return callback(new Error("An error has occured in mail server")); 
    
          callback(null,1);    
     //   res.render('signup.ejs', { message: 'mail server is down' });
     //   };
  //      console.log("Message sent: " + response.message);
       // res.render('confirmation.ejs', { message: to });
   });
};
/*
router.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});
module.exports=router;*/

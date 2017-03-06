

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongodb = require('mongodb')
var mongojs = require('mongojs');
var passport = require('passport');
var db = mongojs('mongodb://pratik:pratik@ds133438.mlab.com:33438/heroku_9rvcpdq9', ['details','userdetails']);// twilio sms/============================
//==================================
//=====================
var User = require('../app/models/user');
module.exports = function(app){
  app.post('/sendmsg', function(req, res) {
    console.log(req.body.num);
    console.log(req.body.que);
    console.log(req.body.radio);
     console.log(req.user.facebook.email);
    res.end();
    if (req.user.local.email) {
     var useremail = req.user.local.email;
    }
    else
    {
      useremail = req.user.facebook.email;
    }
 

    var accountSid  ='ACf71390b66b77f708e838cc74035fa9e7';
    var authToken ='c0e634cf5f57ad5da9f7ec00c6cf0476';

    var quetype = req.body.radio;
    var num = req.body.num;
    var que = req.body.que;
    var keyword = req.body.keyword;
    var twilio = require('twilio');
    db.userdetails.insert( { number: num, email: useremail, que: que} )
    db.userdetails.count({email:useremail}, function (err, results) {
    var count = results;
         console.log(count)  
     
    console.log(count);
    var client = new twilio.RestClient(accountSid, authToken);
if (req.body.num && req.body.que && req.body.radio && count<3) 
{
    
 if(quetype=="option1")
 {
  client.messages.create({
      
    body: que +'\n Type '+keyword+' SPACE your option \n A.Excellent \n B.Very good \n C.Satisfactory \n  D.Poor \n (eg.'+ keyword+' A)  send us a reply',
    to: num,  
    from: '+16467604879' 
}, function(err) {
    console.log(err);
}
);
 }
else if(count<3){
client.messages.create({
    body: que +' \n Type '+keyword+' SPACE your response Rate between 1 to 5, where 5 is the highest and 1 the lowest (eg.'+keyword+' 5) send us a reply',
    to: num,  
    from: '+16467604879' 
}, function(err) {
    console.log(err);
}
);

}

console.log("done");
}

else if (req.body.num && count<3){
    client.messages.create({
      
   body : 'How satisfied are you with the quality of education in your area. Type your AreaCode option \n A.Extermely Satisfied \n B.Moderately Satisfied \n C.Not at all Satisfied \n (eg. 11111 A) send us a reply',
    to: num,  
    from: '+16467604879' 
}, function(err) {
    console.log(err);
}
);
console.log("go");

};
});
});
app.get('/results', function(req, res)
{
   db.details.find(function(err, data) 
  {

     console.log(data);
     res.json(data);
  });




});
app.get('/', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    var User = require('../app/models/user');
    var passport = require('passport');
       if (req.body.Body == 'Start') {
      twiml.message('How satisfied are you with the quality of education in your area. Type your AreaCode option \n A.Extermely Satisfied \n B.Moderately Satisfied \n C. Not at all Satisfied \n (eg. 11111 A) send us a reply');
     }
     else
     {
      var string = req.body.Body;
        var from = req.body.From;
      if (req.user.local.email) {
     var useremail = req.user.local.email;
    }
    else
    {
      useremail = req.user.facebook.email;
    }
 

      string = string.split(" ");
      var stringArray = new Array();
      for(var i =0; i < string.length; i++)
      {
      stringArray.push(string[i]);

      }
      var str = stringArray[1].toLowerCase();

      var zip = stringArray[0];

   if (str == 'a') {
            twiml.message('Thanks for your feedback');
            
          db.details.insert( {user: useremail, number: from, keyword: zip, response: "Excellent"  } )

    } 
    
    else if(str == 'b') {
        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: "Very good"  } )
    
     } 
     else if(str == 'c') 
     {

        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: "Satisfactory"  } )
     }

    else if(str == 'd') 
     {

        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: "Poor"  } )
     }
       else if(str == '1' || str == '2' || str == '3' || str == '4' || str == '5') 
     {

        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: str  } )
     }
     else 
     {
        twiml.message('Invalid Response try again.' +str);
    }



     }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/', function(req, res) {
       var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
       if (req.body.Body == 'Start') {
      twiml.message('How satisfied are you with the quality of education in your area. Type your AreaCode option \n A.Extermely Satisfied \n B.Moderately Satisfied \n C. Not at all Satisfied \n (eg. 11111 A) send us a reply');
     }
     else
     {
      var string = req.body.Body;
        var from = req.body.From;

      string = string.split(" ");
      var stringArray = new Array();
      for(var i =0; i < string.length; i++)
      {
      stringArray.push(string[i]);

      }
      var str = stringArray[1].toLowerCase();

      var zip = stringArray[0];

   if (str == 'a') {
            twiml.message('Thanks for your feedback');
            
          db.details.insert( { number: from, keyword: zip, response: "Excellent"  } )

    } 
    
    else if(str == 'b') {
        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: "Very good"  } )
    
     } 
     else if(str == 'c') 
     {

        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: "Satisfactory"  } )
     }

    else if(str == 'd') 
     {

        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: "Poor"  } )
     }
         else if(str == '1' || str == '2' || str == '3' || str == '4' || str == '5') 
     {

        twiml.message('Thanks for your feedback');
        
        db.details.insert( { number: from, keyword: zip, response: str  } )
     }
     else 
     {
        twiml.message('Invalid Response try again.');
    }



     }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

});


}

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

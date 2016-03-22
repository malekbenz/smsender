var modem = require('modem').Modem();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var comPort ="COM3";
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded


var message =  {};

// var smsText =  'Hi Mr  Hammoudi nasro this is from my PC ';
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('pages/index');
});

app.post('/sendSMS', function (req, res) {

  message ={
        text :req.body.message,
        receiver :req.body.phone,
        encoding :"16bit"
    }

  res.send('Message envoyé ' + message.receiver +' '+ message.text);


  modem.sms(message, function(err, references) {
      callaback(err, references);
      if (err)
      {
          res.send('Message non envoyé !');
      }
      res.send('Message envoyé !');
      });
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});

modem.open(comPort, function(err){
      console.log('Modem is ready');
      modem.on('sms received', function(message){
      console.log("sender " +message.sender + " Message: "+ message.text );

      })
});

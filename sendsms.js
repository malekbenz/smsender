var modem = require('modem').Modem();

var comPort ="COM3";

modem.open(comPort, function(){
      console.log('modem is ready');
    });

console.log(smsText);

module.exports = function( phoneNumber, smsText, callaback){

  var message ={
        text :smsText,
        receiver :phoneNumber,
        encoding :"16bit"
    }

modem.sms(message, function(err, references) {
    callaback(err, references);
    console.log("your message is sent");
    });



}

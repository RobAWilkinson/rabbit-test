var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    if(err) {
      console.log(err);
    }
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer('Wassup'));
    console.log(" [x] Sent 'Hello World!'");
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
app.get('/', function(req, res) {
  res.sendFile('index.html');
});



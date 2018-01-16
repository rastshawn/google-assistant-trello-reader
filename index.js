var httpPort = 3505;
var httpsPort = 3506;

var fs = require('fs');
var http = require('http');
var https = require('https');
var priv_key = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/fullchain.pem', 'utf8');

var credentials = {key: priv_key, cert: certificate};
var express = require('express');
var app = express();

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

app.get('/', function(req, res) {
    res.send("It works");
});

app.post('/ga_trelloreader', function(req, res) {
    var string = "";
    req.on('data', function(data) {
        string += data;
    }); 
    
    req.on('end', function(){
        var request = JSON.parse(string);
		console.log(request);
        var response = "This is a response!";    
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "fulfillmentText" : response,
        }));
    });

});

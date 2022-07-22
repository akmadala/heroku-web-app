var express = require('express');
// var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');

app.set('port', process.env.PORT || 3000);
app.set('appData',dataFile);
app.set('view engine','ejs');
app.set('views','app/views');

app.locals.siteTitle = 'CSgeeks';
app.locals.allFriends = dataFile.friends;

app.use(express.static('app/public'));
app.use(require('./routers/index'));
app.use(require('./routers/schedule'));
app.use(require('./routers/game'));
app.use(require('./routers/pics'));
app.use(require('./routers/submit-feedback'));
app.use(require('./routers/audio'));
app.use(require('./routers/video'));
app.use(require('./routers/feedback'));
app.use(require('./routers/api'));


var Server = app.listen(app.get('port'), function(){
  console.log('listen to port '+app.get('port'));
});

// reload(Server, app);



//var http = require('http');
//var myServer = http.createServer(function(req, res){
//  res.writeHead(200,{"Content-Type":"text/html"});
//  res.write('<h1>connection meetups</h1>');
//  res.end();
//});
//myServer.listen(3000);
//console.log('go to port 3000');

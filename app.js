const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', 'views');
// REMOVE WHEN DEPLOYING
const db_uri = process.env.MONGODB_URI || 'mongodb+srv://akmadala:kgQv7vOLrm4FrGoy@akmadala-cluster1.ubolv.mongodb.net/?retryWrites=true&w=majority';

app.locals.siteTitle = 'Akshay Deep Chowdhary Madala';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  db_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.static('./public'));
app.use(require('./routers/index'));
app.use(require('./routers/schedule'));
app.use(require('./routers/game'));
app.use(require('./routers/pics'));
app.use(require('./routers/submit-feedback'));
app.use(require('./routers/audio'));
app.use(require('./routers/video'));
app.use(require('./routers/feedback'));


const Server = app.listen(app.get('port'), function () {
  if (app.get('port') == 3000) {
    console.log('listen to port ' + app.get('port'));
  }
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

var express = require('express');
var fs = require('fs');
var router = express.Router();
// var app = express();

router.post('/submit-feedback', function(req, res){
  console.log(req.body);

  // res.send('Success');
  res.render('submit-feedback',{
    pageTitle: 'Submit Feedback',
    pageID:'submit-feedback'
  });
});

module.exports = router;

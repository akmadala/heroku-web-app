var express = require('express');
var router = express.Router();


router.get('/submit-feedback', function(req, res){
  res.render('submit-feedback',{
    pageTitle: 'Submit Feedback',
    pageID:'submit-feedback'
  });
});

module.exports = router;

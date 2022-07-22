var express = require('express');
var router = express.Router();


router.get('/schedule', function(req, res){
  res.render('schedule',{
    pageTitle: 'Schedule',
    pageID:'schedule'
  });
});

module.exports = router;

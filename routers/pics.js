const express = require('express');
const router = express.Router();


router.get('/pics', function(req, res){
  res.render('pics',{
    pageTitle: 'Pics',
    pageID:'pics'
  });
});

module.exports = router;

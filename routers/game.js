var express = require('express');
var router = express.Router();


router.get('/game', function(req, res){
  res.render('game',{
    pageTitle: 'Game',
    pageID:'game'
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();


router.get('/audio', function(req, res){
  res.render('audio',{
    pageTitle: 'Audio',
    pageID:'audio'
  });
});

module.exports = router;

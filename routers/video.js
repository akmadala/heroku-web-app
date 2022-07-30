const express = require('express');
const router = express.Router();


router.get('/video', function(req, res){
  res.render('video',{
    pageTitle: 'Video',
    pageID:'video'
  });
});

module.exports = router;

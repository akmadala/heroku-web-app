var express = require('express');
var fs = require('fs');
var router = express.Router();
// var app = express();

router.post('/submit-feedback', function (req, res) {
  console.log(req.body);

  fs.writeFileSync('./public/docs/feedback/feedback_'+Date.now().toString()+'.json',
                  JSON.stringify(req.body));

  // fs.writeFile('../public/docs/feedback/feedback_'+Date.now().toString()+'.json',
  //             JSON.stringify(req.body),
  //             (err) => {
  //               if (err) throw err;
  //               console.log('Data written to file');
  //             }
  //   );

  // res.send('Success');
  res.render('submit-feedback', {
    pageTitle: 'Submit Feedback',
    pageID: 'submit-feedback'
  });
});

module.exports = router;

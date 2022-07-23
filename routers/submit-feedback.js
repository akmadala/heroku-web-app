const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akmadala9@gmail.com',
    pass: 'etnjvafehwofjzny'
  }
});

router.post('/submit-feedback', function (req, res) {

  var data = req.body;
  fs.writeFileSync('./public/docs/feedback/feedback_' + Date.now().toString() + '.json',
    JSON.stringify(data));

  var mailOptions = {
    from: 'akmadala9@gmail.com',
    to: data.email,
    subject: 'Thank you!',
    text: 'Dear '+data.name+', Thank you for your feedback!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render('submit-feedback', {
    pageTitle: 'Submit Feedback',
    pageID: 'submit-feedback'
  });
});

module.exports = router;

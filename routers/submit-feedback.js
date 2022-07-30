const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const router = express.Router();
const feedbackModel = require("../models/feedback");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akmadala9@gmail.com',
    pass: process.env.MAIL_PASS 
  }
});

function generateHTMLEmail(n, name, resubmit) {
  if (resubmit) {
    return '<h3>Dear ' + name + '</h3>' + '<p>Thank you for revisiting. Your feedback has been updated.</p>'
  }
  return '<h3>Dear ' + name + '</h3>' + '<p>Thank you for your feedback. You are one of my ' + n.toString() + ' honored guests who left feedback.</p>';
}

function sendMail(n, data, resubmit, res) {
  var mailOptions = {
    from: 'akmadala9@gmail.com',
    to: data.email,
    subject: 'Thank you!',
    // text: 'Dear ' + data.name + ', Thank you for your feedback!',
    html: generateHTMLEmail(n, data.name, resubmit)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.render('feedback', {
        pageTitle: 'Feedback',
        pageID: 'feedback'
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.render('submit-feedback', {
        pageTitle: 'Submit Feedback',
        pageID: 'submit-feedback'
      });
    }
  });
}

router.post('/submit-feedback', async (req, res) => {

  const data = req.body;

  try {
    const updatedFeedback = await feedbackModel.findOneAndUpdate({ email: data.email }, data);
    await updatedFeedback.save();
    sendMail(0, data, true, res);
  } catch (err) {
    console.log(err);

    const feedback = new feedbackModel(data);

    try {
      await feedback.save();
    } catch (error) {
      console.log(error);
    }


    const feedbacks = await feedbackModel.find({});
    try {
      console.log(feedbacks.length);
      sendMail(feedbacks.length, data, false, res);
    } catch (error) {
      console.log(error);
    }
  }

  // Writing to file (Project 4)
  // fs.writeFileSync('./public/docs/feedback/feedback_' + Date.now().toString() + '.json',
  //   JSON.stringify(data));

});

module.exports = router;

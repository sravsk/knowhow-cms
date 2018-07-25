const sgMail = require('@sendgrid/mail');
const key = process.env.SENDGRID_API_KEY || require('../config.js').SENDGRID_API_KEY;

var sendmail = function(to, subject, html) {
  sgMail.setApiKey(key);
  const msg = {
    to: to,
    from: 'knowhowrpt@gmail.com',
    subject: subject,
    html: html
  };
  sgMail.send(msg);
};

module.exports = sendmail;
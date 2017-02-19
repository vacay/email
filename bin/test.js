var email	= require('../index')
var config	= require('../config')
var sendEmail	= email(config)

sendEmail({
  emails: ['example@yahoo.com'],
  subject: 'test',
  body: 'test email',
  replyTo: 'from@vacay.io'
}, function(err) {
  if (err) console.log(err)
  else console.log('sent')
})

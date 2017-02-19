var email	= require('../index')
var config	= require('../config')
var sendEmail	= email(config)

sendEmail({
  emails: ['kia2882@yahoo.com'],
  subject: 'test',
  body: 'test email',
  replyTo: 'admin@vacay.io'
}, function(err) {
  if (err) console.log(err)
  else console.log('sent')
})

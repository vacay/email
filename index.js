var ses		= require('node-ses')
var showdown	= require('showdown')

var index = function(opts) {
  var client = ses.createClient(opts.ses)

  return function(data, cb) {

    var base_url	= opts.base_url || 'https://vacay.io'
    var from_address	= opts.from_address || 'admin@vacay.io'
    var converter	= new showdown.Converter()
    var html		= converter.makeHtml(data.body)

    if (data.link) {
      html += '<a href="' + opts.base_url + data.link.target + '" target="_blank" style="' +
	'color:#51b364;' +
	'border:1px solid #51b364;' +
	'background:#fff;' +
	'padding:10px;' +
	'font-size:14px;' +
	'margin:10px 0;' +
	'text-decoration:none;' +
	'border-radius:999em;' +
	'display:inline-block;' +
	'">' + data.link.text + '</a>'
    }

    html += '<p style="font-size:small;color:#666">—<br>Login and go to your <a href="' + opts.base_url + '/settings" target="_blank">settings</a> to adjust your notification preferences</p>'

    var mailOptions = {
      from: from_address,
      bcc: data.emails,
      subject: data.subject,
      message: '<div style="' +
	'font-family:Georgia,Cambria,Times,serif;' +
	'width:100%;' +
	'max-width:640px;' +
	'color:#333332;' +
	'line-height:25px;' +
	'font-size:16px;' +
	'">' + html + '</div>',
      replyTo: data.replyTo
    }

    client.sendEmail(mailOptions, cb)
  }
}

module.exports = index

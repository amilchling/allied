Meteor.startup(function() {
	//process.env.MAIL_URL='smtp://postmaster%40sandboxe5181761ecf44417a8b5caa6f0846285.mailgun.org:test135@smtp.mailgun.org:587/';
});

Emails = new Meteor.Collection("emails");
EMAIL_DAILY_LIMIT = 200;

Meteor.methods({
	sendEmail: function(name, from, text){
		var subject = "Email From Website";
		var to = "info@amgofnc.com";
		var msg = text + "\n FROM:" + name;

		check([from, name, text], [String]);

		var d = new Date().getTime();
		var amt = 0;
		var day = moment(new Date()).format('L');
		console.log(day);
		if(Emails.find({date: day}).count() > 0){
			amt = Emails.findOne({date: day}).numSent;
		}
		else{
			Emails.insert({
				date: day,
				numSent: 0
			});
			console.log(Emails.find({}).count())
		}

		if(amt < EMAIL_DAILY_LIMIT){

			Email.send({
				to: to,
				from: from,
				subject: subject,
				text: msg
			});
			Emails.update({date: day}, {$inc: {numSent: 1}});
		}
	}
});
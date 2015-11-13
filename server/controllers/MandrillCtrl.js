var mandrill = require('mandrill-api/mandrill');
var mandrill_client = (process.env.MANDRILL_ID)
mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_ID);

module.exports = {
	sendMail: function(req, res){
		var message = {
			"text": req.body.text,
			"subject": "Thank you for contacting DerelicteClothing.com",
			"from_email": req.body.from,
			"from_name": req.body.name,
			"to": [{
					"email": "DevTest1989to1990@gmail.com",
					"name": "Customer Support",
					"type": "to"
				}],
			"headers": {
				"Reply-To": req.body.email
			}
			
		};
	var async = false;
	var ip_pool = "Main Pool";
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
		console.log(result);
    /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
});
	}
}
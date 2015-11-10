var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_ID);


module.exports ={
    sendMail: function(req, res){
        var message = {
            "text": req.body.text,
            "subject": "Test Email",
            "from_email": req.body.from,
            "from_name": req.body.name,
            "to": [{
                    "email": 'devtest1989to1990@gmail.com',
                    "name": "Customer Service",
                    "type": "to"
                }],
            "headers": {
                "Reply-To": req.body.from
            },
            "important": false,
            "track_opens": null,
            "track_clicks": null,
            "auto_text": null,
            "auto_html": null,
            "inline_css": null,
            "url_strip_qs": null,
            "preserve_recipients": null,
            "view_content_link": null,
            "bcc_address": "message.bcc_address@example.com",
            "tracking_domain": null,
            "signing_domain": null,
            "return_path_domain": null,
            "merge": true,
            "merge_language": "mailchimp",
        };
        var async = false;
        var ip_pool = "Main Pool";
        var send_at = null;
        mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
            console.log(result);
            res.json(result);
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
    },
    
    sendPurchaseEmail: function(req, res){
        var message = {
            "html": "<p>Example HTML content</p>",
            "text": req.body.text,
            "subject": "Test Email",
            "from_email": 'devtest1989to1990@gmail.com',
            "from_name": "Customer Service",
            "to": [{
                    "email": req.body.to,
                    "name": req.body.name,
                    "type": "to"
                }],
            "headers": {
                "Reply-To": "message.reply@example.com"
            },
            "important": false,
            "track_opens": null,
            "track_clicks": null,
            "auto_text": null,
            "auto_html": null,
            "inline_css": null,
            "url_strip_qs": null,
            "preserve_recipients": null,
            "view_content_link": null,
            "bcc_address": "message.bcc_address@example.com",
            "tracking_domain": null,
            "signing_domain": null,
            "return_path_domain": null,
            "merge": true,
            "merge_language": "mailchimp",
        };
        var async = false;
        var ip_pool = "Main Pool";
        var send_at = null;
        mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
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
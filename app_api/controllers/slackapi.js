var IncomingWebhook = require('@slack/client').IncomingWebhook;

var url = process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/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';

var webhook = new IncomingWebhook(url);


module.exports.IncomingWebhook = function(req, res){
webhook.send('Hello guys, welcome to my project using an external API. This api was taken from https://api.slack.com/', function(err, header, statusCode, body) {
res.json()
    }); 
  };
  
  
  

var API_KEY = "c57c2373d400b9ce494e2727f87b6a6b-2bf328a5-a4f9809c";
var DOMAIN = "sandbox4840d050e91c4a2c85c8d916b7081085.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const data = {
  from: "Excited User <me@samples.mailgun.org>",
  to: "mauruciotaffarel@gmail.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
};

mailgun.messages().send(data, (error, body) => {
  console.log(body);
});



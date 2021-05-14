import express from 'express';
const bodyParser = require('body-parser');
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/messages', (req: express.Request, res: express.Response) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch((err: express.Errback) => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });

  app.listen(3002, () =>
  console.log('Express server is running on localhost:3002')
);
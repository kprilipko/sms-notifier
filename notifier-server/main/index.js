"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var app = express_1.default();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api/messages', function (req, res) {
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
    })
        .then(function () {
        res.send(JSON.stringify({ success: true }));
    })
        .catch(function (err) {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
    });
});
app.listen(3002, function () {
    return console.log('Express server is running on localhost:3002');
});

const nodemailer = require("nodemailer");
const http = require('http');
const { strict } = require("assert");

var options = {
    host: 'checkip.amazonaws.com',
    port: 80,
    path: '/'
};

let transporter = nodemailer.createTransport({
    host: process.env.EMAILHOST,
    port: process.env.EMAILPORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SENDEREMAIL,
        pass: process.env.EMAILPASS,
    },
});

function send() {
    http.get(options, function (res) {
        res.on("data", ipData => {
            console.log("Ip found: " + ipData);

            let mailInfo = transporter.sendMail({
                from: '"Raspberry Pi" <' + process.env.SENDEREMAIL + '>',
                to: process.env.RECIPIENTEMAIL,
                subject: "ShopMe server started.",
                text: "Public ip: http://" + ipData.toString(),
            }, (err, info) => {
                if (err) {
                    console.log("Ip email sending failed: " + err);
                    return;
                }

                console.log("Ip email sent: %s", info.messageId);
            });
        });
    }).on('error', function (e) {
        console.log("Could not get ip: " + e.message);
    });
}

module.exports = send;
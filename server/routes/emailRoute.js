const EmailRoute = require("express").Router();
const nodemailer = require("nodemailer");

EmailRoute.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "flanerapplication@gmail.com",
      pass: "imhcvoeuoazouvcm",
    },
  });
  console.log(req.body);
  const mailOptions = {
    from: "flanerapplication@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      res.send(info.response);
    }
  });
});

module.exports = EmailRoute;

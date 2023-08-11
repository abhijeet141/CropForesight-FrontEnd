const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

let sendEmail = () => {
  return new Promise((request, response) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });
    const mail_configs = {
      //mail_option is
      from: username,
      to: username2,
      subject: "NODE JS Email",
      text: "Password Needs to be Reset",
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        return reject({ message: "An Error has occured" });
      }
      return resolveContent({ message: "Email Sent Succesfullt" });
    }); //function behaving as object //we are passing an object inside createTransport
  });
};
app.listen(5000, () => {
  console.log("Listening to Port Number 5000");
});
app.get("/", (req, res) => {
  //   response.send({
  //     result:
  //       "Sathgurunatha Gnanananda Guruji Namaji Periva Sai Baba Saraswathi Amman",

  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

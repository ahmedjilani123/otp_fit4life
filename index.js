const express = require('express');
const cors = require('cors');
require("dotenv").config();
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: '*', 
  methods: 'GET,POST'
};

app.use(cors(corsOptions));
app.get('/', function(req, res){
  res.send("welcome");
});
app.post('/Email',async (req, res) => {
    try {
        const { senderEmail } = req.body;

        if (!senderEmail) {
            return res.status(400).send("Email is required");
        }

        console.log(process.env.PASS);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: 'fit4life.dev@gmail.com',
                pass: process.env.PASS,
            },
        });
       otp = Math.floor(100000 + Math.random() * 900000);
       console.log(otp);
       
        const info = await transporter.sendMail({
          from: `"fit 4 life" <fit4life.dev@gmail.com>`,
          to: senderEmail,
          subject: "Together, We Build Something Better – OTP !",
          text: `Dear ${senderName},\n ${otp}is your One-Time Password (OTP) for verifying your email address. Please use this code to complete your verification process.
           \n\nBest regards,\nfit 4 life`,
          html: `
              <p>Dear ${senderName},</p>
              <p><strong>${otp}</strong> is your One-Time Password (OTP) for verifying your email address. Please use this code to complete your verification process.</p>
              <p>Best regards,<br>fit 4 life</p>
          `,
      });
      
     
        res.status(200).json({otp:"Thank-you email successfully sent"});
    } catch (error) {
        res.status(500).send("Failed to send thank-you email",error);
    }
});

app.listen(port, () => {
    console.log('Listening on port', port);
});
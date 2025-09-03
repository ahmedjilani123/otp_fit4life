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

   

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.Email,
                pass: process.env.KeyP
 ,
            },
        });
     var  otp = Math.floor(100000 + Math.random() * 900000);
     
        const info = await transporter.sendMail({
          from: `"fit 4 life" <fit4life.dev@gmail.com>`,
          to: senderEmail,
          subject: "Together, We Build Something Better – OTP !",
          html: `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OTP Email Template</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <style>
    body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 0;
  margin: 0;
}
.container-sec {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}
.otp-code {
  font-size: 24px;
  font-weight: bold;
  background-color: #f8f9fa;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  border: 1px dashed #007bff;
  color: #007bff;
}
.btn-verify {
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  background-color: #007bff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}
.footer-text {
  color: #6c757d;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
.footer-text a {
  color: #007bff;
  text-decoration: none;
}
.otp-lock {
  color: #333;
  font-size: 80px;
}
.welcome-section {
  background: #fc931d;
  padding: 30px;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  margin: 20px 0px;
}
.welcome-text {
  font-family: monospace;
}
.app-name {
  font-size: 30px;
  font-weight: 800;
  margin: 7px 0px;
}
.verify-text {
  margin-top: 25px;
  font-size: 25px;
  letter-spacing: 3px;
}
i.fas.fa-envelope-open {
  font-size: 35px !important;
  color: #ffffff;
}

    </style>
</head>

<body>
  <div class="container-sec">
    <div class="text-center">
      <div><i class="fas fa-lock otp-lock"></i></div>
      <div class="welcome-section">
        <div class="app-name">
          --- Fit 4 Life ---
        </div>
        <div class="welcome-text">
          Thanks for signing up !
        </div>

        <div class="verify-text">
          Please Verify Your OTP
        </div>
        <div class="email-icon">
          <i class="fas fa-envelope-open"></i>
        </div>

      </div>
      <h2>Hello, Users</h2>
      <p>Your One-Time Password (OTP) for verification is:</p>
      <div class="otp-code">${otp}</div>
      <p class="mt-4">Please use this OTP to complete your verification. The OTP is valid for the next 10 minutes.</p>
    </div>
    <div class="footer-text">
      <p>If you did not request this OTP, please <a href="#">contact us</a> immediately.</p>
      <p>Thank you,<br>The daffodils Team</p>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>
          `,
      });
      
     
        res.status(200).json({"OTP":otp});
    } catch (error) {
        res.status(500).send("Failed to send thank-you email",error);
    }
});

app.listen(port, () => {
    console.log('Listening on port', port);
});
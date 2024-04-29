const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors({
  origin: 'http://localhost:5500'
}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const PORT = process.env.PORT || 5501;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Serve your static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, "assets", "views", "en","career.html"))); 

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "peachmytest@hotmail.com",
    pass: "adam0609",
  },
});


// Handle form submission for vacancy page
app.post("/submit-form", upload.single('attachment'), (req, res) => {

  const formData = req.body;
  const mailOptions = {
    from: "peachmytest@hotmail.com",
    to: "lanisha@peachgroup.no",
    subject: `Application for ${formData.job} from Peach People`,
    text: `
      Full Name: ${formData.fullName}\n
      Phone: ${formData.phone}\n
      Email: ${formData.email}\n
      Country : ${formData.country}\n
      About You: ${formData.aboutyou}`,

      attachments: []
      
  };

  if (req.file) {
    // The 'attachment' field has a value, attach the uploaded file
    mailOptions.attachments.push({
      filename: req.file.originalname,
      content: req.file.buffer
    });
  }


  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});



//mail sending from contact form
app.post("/submit-contactform", (req, res) => {
  const formData = req.body;
  const mailOptions = {
    from: "peachmytest@hotmail.com",
    to: "lanisha@peachgroup.no",
    subject: `Contact request from Peach People`,
    text: `
      Name: ${formData.name}\n
      Email Id: ${formData.email}\n
      Phone Number: ${formData.phone}\n
      Country : ${formData.country}\n
      Message: ${formData.message}`,

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});


//mail sending for news letter subscription
app.post("/subscribe-newsletter", (req, res) => {
  const formData = req.body;
  const mailOptions = {
    from: "peachmytest@hotmail.com",
    to: "lanisha@peachgroup.no",
    subject: `Newsletter subscription`,
    text: `
      Email Id: ${formData.newsletter}\n
      Country : ${formData.country}\n
      Language: ${formData.language}`,

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

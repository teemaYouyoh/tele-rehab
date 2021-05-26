const nodemailer = require('nodemailer')
const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path')

exports.nodemailerFunc = async (req, res) =>{
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, "files")
    //     },
    //     filename: function (req, file, cb) {
    //         const parts = file.mimetype.split("/");
    //         cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`);
    //     }
    // })
    // // console.log(req.body.file);
    // const upload = multer({storage: storage});
    // upload.single();
    // res.sendFile(`${__dirname}/files/${req.body.file.name}`);

    const output = `
    <p style="font-size: 16px">Новый запрос на регистрацию</p>
    <h3 style="font-size: 24px;">Детальная информация</h3>
    <ul>
      <li style="font-size: 18px; list-style: none">ФИО: ${req.body.name}</li>
      <li style="font-size: 18px; list-style: none">Телефон: ${req.body.phone}</li>
      <li style="font-size: 18px; list-style: none">Email: ${req.body.email}</li>
      <li style="font-size: 18px; list-style: none">День Рождения: ${req.body.birthday}</li>
      <li style="font-size: 18px; list-style: none">Описание диагноза: ${req.body.comment}</li>      
    </ul>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'touchitworking@gmail.com', // generated ethereal user
            pass: 'xymletdnizoezehh'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });


    // setup email data with unicode symbols
    let mailOptions = {
        from: `"Форма регистрации - " <${req.body.email}>`,
        // from: 'sergejjolejj@gmail.com', // sender address
        to: 'touchitworking@gmail.com', // list of receivers
        subject: 'Форма регистрации', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
        attachments: [
            {
                filename: req.body.file.name,
                contentType: req.body.file.type,
                path: 'https://support.apple.com/library/content/dam/edam/applecare/images/ru_RU/ios/iphoto/ios13-iphone11-pro-camera-live-photo.jpg',
            }
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // res.render('login', {msg:'Email has been sent'});
    });





}
const nodemailer = require('nodemailer')
const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path')


exports.nodemailerFooter = async (req, res) => {
    const output = `
    <p style="font-size: 16px">Обратная связь</p>
    <h3 style="font-size: 24px;">Данные для связи</h3>
    <ul>
      <li style="font-size: 18px; list-style: none">Имя: ${req.body.name}</li>      
      <li style="font-size: 18px; list-style: none">Номер телефона: ${req.body.phone}</li>
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
        from: `touchitworking@gmail.com`,
        // from: 'sergejjolejj@gmail.com', // sender address
        to: `touchitworking@gmail.com`, // list of receivers
        subject: 'Обратный звонок', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
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

exports.nodemailerSignIn = async (req, res) => {
    const output = `
    <p style="font-size: 16px">Регистрация</p>
    <h3 style="font-size: 24px;">Регистрация подтверждена</h3>
    <p style="font-size: 16px">Данные для входа</p>

    <ul>
      <li style="font-size: 18px; list-style: none">Email: ${req.body.email}</li>      
      <li style="font-size: 18px; list-style: none">Пароль: ${req.body.password}</li>
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
        from: `touchitworking@gmail.com`,
        // from: 'sergejjolejj@gmail.com', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Регистрация успешна', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
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

exports.nodemailerUpdatePlan = async (req, res) => {
    const output = `
    <p style="font-size: 16px">Обновление</p>
    <h3 style="font-size: 24px;">Ваш курс был изменен</h3>
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
        from: `touchitworking@gmail.com`,
        // from: 'sergejjolejj@gmail.com', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Изменение курса', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
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

exports.nodemailerFunc = async (req, res) =>{
    console.log(req.body);
    console.log(req.body.name);
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
                filename: req.body.file, 
                // contentType: req.body.file.type,
                path: __dirname + `/public/uploads/${req.body.file}`
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

    res.send(res)
}

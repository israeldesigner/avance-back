const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const allowCors = require('./cors');
const queryParser = require('express-query-int');
const mailer = require('nodemailer');

server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());
server.use(allowCors);
server.use(queryParser());

const transporter = mailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    secure: false,
    auth: {
      user: 'contatoavance@contabilidadeavance.com.br',
      pass: 'rafa2500@#'
    }
})

transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Rodando servidor de email');
    }
})

server.post("/send-mail", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
    var content = ` nome: ${name} \n email: ${email} \n assunto: ${subject} \n mensagem: ${message}`;
  
    var mail = {
      from: name,
      to: email,
      subject: subject,
      text: content
    }
  
      transporter.sendMail(mail, (err, data) => {
          if (err) {
            res.json({
              status: 'fail'
            })
          } else {
            res.json({
             status: 'success'
            })
          }
      })
  
      // transporter.sendMail(message, (error,info) =>{
      //     if(error) {
      //         return res.status(500).send("falhou o email aentrega");
      //     }
      //     return res.status(200).send("Enviou");
      // })
  })

server.listen(port, function(){
    console.log(`BACKEND is running port ${port}`);
})

module.exports = server;
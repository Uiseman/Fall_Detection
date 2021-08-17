const express=require('express');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
const SMTP=require('../config/smtp');

const User=require('../models/User');
const { user } = require('../config/smtp');

const transport=nodemailer.createTransport({
    host: SMTP.host,
    port: SMTP.port,
    secure: false,
    auth: {
        user: SMTP.user,
        pass:SMTP.pass,
    },

    tls: {
        rejectUnauthorized: false
    }

});

async function sendMail(target, name,user,phone){
    const mailSent=transport.sendMail({
        text: 'Olá '+name+ ' detectamos agora a pouco uma possível queda do usuário '+user+
        '. Você pode entrar em contato com o paciente pelo numero: '+phone,
        subject: 'QUEDA DETECTADA',
        from: 'Fall Detection',
        to: target,


    });
}

module.exports ={

    async create(req,res){

        try {
            const {userName,phoneNumber,emergencyContacts}= req.body;
            const userID= crypto.randomBytes(5).toString('HEX');
            const user= {userID,userName,phoneNumber, emergencyContacts} ;
            await User.create(user);
            return res.send({userID});
        
        }
    
        catch(err){
            console.log(err);
            return res.status(400).send({error:'Registration failed'});
        }
       
    },

    async falldetected(req,res) {

        try {
            id= req.params.id;
            const [user]= await User.find({userID:id});
            for(i=0;i<user.emergencyContacts.length;i++){
                const fields=user.emergencyContacts[i].split(':');
                await sendMail(fields[1],fields[0],user.userName,user.phoneNumber);
        
            }
            return res.status(200).send();

        } catch(err) {
            console.log(err);
            return res.status(400).send({error:'sending failed'});
        }
     

    }
    

}




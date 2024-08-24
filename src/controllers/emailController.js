import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    logger: true,
    transactionLog: true,
    allowInternalNetworkInterfaces: false
},
    {
        from: 'Nodemailer <example@nodemailer.com>',
    }
);
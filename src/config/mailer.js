const mailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config();

const transporter = mailer.createTransport({
    service: 'gmail',
    // host: process.env.MAIL_HOST,
    // port: process.env.MAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendConfirmation = async (to , body)=>{


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject : 'Reservation Confirmation',
        html: body
    };
    try{

       
        const info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.response);
        return info;


    }catch(err){

        console.log(err);
        throw new Error('Could not send confirmation email');
    }
}

exports.generateEmail = async (reservation) => {
    return `
     <h1>Reservation Confirmation</h1>
     <p>Thank you for your reservation!</p>
     <p><strong>Movie:</strong>'Movie title unavailable'}</p>
     <p><strong>Showtime:</strong>'Time unavailable'}</p>
     <p><strong>Seat:</strong>'Seat number unavailable'}</p>
     <p><strong>Date:</strong>'Date unavailable'}</p>
     <p>We look forward to seeing you at the cinema!</p>
    `;
};


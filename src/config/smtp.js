require('dotenv/config');

module.exports={
    host:"smtp.gmail.com",
    port: 587,
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_EMAIL_PASS
}
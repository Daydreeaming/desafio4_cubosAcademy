const nodemailer = require('nodemailer');

require("dotenv").config();

const config = {
	host: process.env.MAILTRAP_HOST, 
	port: process.env.MAILTRAP_PORT,
	secure: false,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PW,
	}
}; 

const transport = nodemailer.createTransport(config);

const enviarEmail = async (from, to, assunto, html) => {

	const email = await transport.sendMail({
		from,
		to,
		assunto, 
		html
	});

	return email;
}

module.exports = { enviarEmail }
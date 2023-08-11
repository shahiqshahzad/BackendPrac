import nodemailer from "nodemailer";

async function sendConfirmationEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "davion86@ethereal.email",
        pass: "TNruZMeZEg2Wt3Vrxy",
      },
    });
    const mailOptions = {
      from: "davion86@ethereal.email",
      to: email,
      subject: "Confirm Your Email",
      html: `<p>Click the following link to confirm your email:</p>
                   <a href="http://localhost:4000/user/verify/${token}">Confirm Email</a>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

export default sendConfirmationEmail;

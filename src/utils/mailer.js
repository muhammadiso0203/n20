import mail from "nodemailer";

export const sendMail = async (email, title, otp) => {
  const transporter = mail.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: title,
    text: otp,
  });

  console.log(info);
  
};

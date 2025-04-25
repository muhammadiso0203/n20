import mail from "nodemailer";

export const transporter = mail.createTransport({
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});

export const mailMesssage = {
  from: process.env.SMTP_USER,
  to: "",
  subject: "Full stack N20",
  text: "Hala Madrid",
};

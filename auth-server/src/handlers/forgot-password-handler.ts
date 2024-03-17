import { RequestHandler } from "express";
import { transporter } from "../lib/nodemailer.js";
import { Api, JWT, Nodemailer } from "../config/environment.js";
import jsonwebtoken from "jsonwebtoken";

export type ReqQuery = qs.ParsedQs & Record<'email', string>;
export type ForgotPasswordRequestHandler = RequestHandler<unknown, unknown, unknown, ReqQuery>;

const forgotPasswordRequestHandler: ForgotPasswordRequestHandler = async (req, res) => {
  const { email } = req.query;
  const token = jsonwebtoken.sign({ email }, JWT.accessSecret, { expiresIn: '5m' });
  const mailBody = Api.Auth.forgotPasswordMailHtml.replace('{token}', token);
  transporter.sendMail({
    from: Nodemailer.transportAuthUser,
    to: email,
    subject: Api.Auth.forgotPasswordMailSubject,
    text: Api.Auth.forgotPasswordMailText,
    html: mailBody,
  });
  res.sendStatus(200);
}

export default forgotPasswordRequestHandler;

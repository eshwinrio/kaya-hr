import { createTransport } from "nodemailer";

export const transporter = createTransport({
  service: process.env.NODEMAILER_TRANSPORT_SERVICE,
  host: process.env.NODEMAILER_TRANSPORT_HOST,
  port: Number(process.env.NODEMAILER_TRANSPORT_PORT),
  secure: process.env.NODEMAILER_TRANSPORT_SECURE === "true",
  auth: {
    user: process.env.NODEMAILER_TRANSPORT_AUTH_USER,
    pass: process.env.NODEMAILER_TRANSPORT_AUTH_PASS,
  },
  tls: {
    ciphers: process.env.NODEMAILER_TRANSPORT_TLS_CIPHERS
  }
});

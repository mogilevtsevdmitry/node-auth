import nodemailer from 'nodemailer'
import config from '../config/config'
import message from './message'

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.auth.user,
        pass: config.smtp.auth.pass,
      },
    })
  }

  async sendActivationLink(to, link) {
    await this.transporter.sendMail({
      from: config.smtp.user,
      to,
      subject: 'Confirm email',
      text: '',
      html: message(link),
    })
  }
}

export default new MailService()

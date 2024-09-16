import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: "gmail",
        auth: {
          user: "testewenlock@gmail.com",
          pass: "WenLock@123" 
        }
    });
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(mailOptions);
  }
}
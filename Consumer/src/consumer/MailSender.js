import nodemailer from "nodemailer";
import "dotenv/config";

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    sendMail(targetEmail, content) {
        const message = {
            from: 'Music Playlist App',
            to: targetEmail,
            subject: `Playlist's Export`,
            text: `This is result of playlist's export`,
            attachments: [
                {
                    filename: 'playlists.json',
                    content
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

export default MailSender;
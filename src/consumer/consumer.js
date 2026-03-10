import Listener from "./Listener.js";
import MailSender from "./MailSender.js";
import PlaylistService from "./PlaylistService.js";
import amqp from "amqplib";
import "dotenv/config";

const init = async () => {
    const playlistService = new PlaylistService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistService, mailSender);

    // membuat connection untuk RabbitMQ
    const conn = await amqp.connect(process.env.RABBITMQ_SERVER);
    // membuat channel
    const channel = await conn.createChannel();

    await channel.assertQueue('export:playlists', {
        durable: true
    });

    channel.consume('export:playlists', listener._listen, { noAck: true });
}
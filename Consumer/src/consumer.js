import Listener from "./consumer/Listener.js";
import MailSender from "./consumer/MailSender.js";
import PlaylistService from "./consumer/PlaylistService.js";
import amqp from "amqplib";
import "dotenv/config";

const init = async () => {
    try {
        const playlistService = new PlaylistService();
        const mailSender = new MailSender();
        const listener = new Listener(playlistService, mailSender);

        const conn = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await conn.createChannel();

        await channel.assertQueue('export:playlists', {
            durable: true
        });

        channel.consume('export:playlists', listener._listen, { noAck: true });

        console.log('Consumer is running and waiting for messages...');
    } catch (error) {
        console.error('Failed to start consumer:', error);
        process.exit(1);
    }
};

init();

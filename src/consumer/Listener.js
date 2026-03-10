class Listener {
    constructor(mailSender, playlistService) {
        this._mailSender = mailSender;
        this._playlistService = playlistService;

        this._listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this._playlistService.getPlaylist(playlistId);
            const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(playlist));

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

export default Listener;
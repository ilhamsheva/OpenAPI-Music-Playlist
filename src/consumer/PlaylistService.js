import { Pool } from "pg";

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    // get playlist by id
    async getPlaylist(playlistId) {
        const query = {
            text: `SELECT p.* FROM playlists p LEFT JOIN collaborations c ON c.playlist_id = p.id WHERE p.owner = $1 OR c.user_id = $1 GROUP BY p.id`,
            values: [playlistId]
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
}

export default PlaylistService;
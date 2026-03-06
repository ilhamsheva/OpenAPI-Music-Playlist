import { nanoid } from "nanoid";
import { Pool } from "pg";

class CollaborationsRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async addCollaboration(playlistId, userId) {
        const id = "collab-" + nanoid(16);
        const query = {
            text: `INSERT INTO users_playlists (id, playlist_id, user_id) VALUES ($1, $2, $3) RETURNING id`,
            values: [id, playlistId, userId]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async deleteCollaboration(playlistId, userId) {
        const query = {
            text: `DELETE FROM users_playlists WHERE playlist_id = $1 AND user_id = $2 RETURNING id`,
            values: [playlistId, userId]
        };

        const result = await this.pool.query(query);
        return result.rowCount;
    }

    async getCollaborationsByPlaylist(playlistId) {
        const query = {
            text: `SELECT u.id, u.username, u.fullname FROM users_playlists AS up JOIN users AS u ON u.id = up.user_id WHERE up.playlist_id = $1`,
            values: [playlistId]
        };

        const result = await this.pool.query(query);
        return result.rows;
    }

    async verifyCollaborator(playlistId, userId) {
        const query = {
            text: `SELECT * FROM users_playlists WHERE playlist_id = $1 AND user_id = $2`,
            values: [playlistId, userId]
        };

        const result = await this.pool.query(query);
        return result.rows.length > 0;
    }
}

export default CollaborationsRepositories;
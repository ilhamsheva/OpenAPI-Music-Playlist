import { nanoid } from "nanoid";
import { Pool } from "pg";

class PlaylistRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addPlaylist({ name, owner, username }) {
    const id = "playlist-" + nanoid(16);
    const query = {
      text: "INSERT INTO playlists(id, name, owner, username) VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, name, owner, username],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getPlaylistsByOwner(owner) {
    const query = {
      text: "SELECT id, name, username FROM playlists WHERE owner = $1",
      values: [owner],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getPlaylistsByOwnerOrCollaborator(userId) {
    const query = {
      text: `SELECT DISTINCT p.id, p.name, p.username 
             FROM playlists p 
             LEFT JOIN users_playlists up ON p.id = up.playlist_id 
             WHERE p.owner = $1 OR up.user_id = $1`,
      values: [userId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async deletePlaylist(id) {
    const query = {
      text: "DELETE FROM playlists WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rowCount;
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: "SELECT owner FROM playlists WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0]?.owner === owner;
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = "ps-" + nanoid(16);
    const query = {
      text: "INSERT INTO playlist_songs(id, playlist_id, song_id) VALUES($1, $2, $3) RETURNING id",
      values: [id, playlistId, songId],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async logActivity(playlistId, songId, userId, action) {
    const id = "activity-" + nanoid(16);
    const time = new Date().toISOString();
    const query = {
      text: "INSERT INTO playlist_song_activities(id, playlist_id, song_id, user_id, action, time) VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, playlistId, songId, userId, action, time],
    };

    await this.pool.query(query);
  }

  async getActivities(playlistId) {
    const query = {
      text: `SELECT u.username, s.title, psa.action, psa.time 
             FROM playlist_song_activities psa 
             JOIN users u ON psa.user_id = u.id 
             JOIN songs s ON psa.song_id = s.id 
             WHERE psa.playlist_id = $1 
             ORDER BY psa.time ASC`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `
      SELECT s.id, s.title, s.performer
      FROM playlist_songs ps
      JOIN songs s ON ps.song_id = s.id
      WHERE ps.playlist_id = $1
    `,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT p.id, p.name, u.username FROM playlists p JOIN users u ON p.owner = u.id WHERE p.id = $1`,
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const query = {
      text: "DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2",
      values: [playlistId, songId],
    };

    const result = await this.pool.query(query);
    return result.rowCount;
  }
}

export default PlaylistRepositories;

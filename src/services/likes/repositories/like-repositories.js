import { nanoid } from "nanoid";
import { Pool } from "pg";

class LikeRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async addLike({ userId, albumId }) {
    const id = "like-" + nanoid(16);
    const createdAt = new Date().toISOString();

    const query = {
      text: "INSERT INTO user_album_likes (id, user_id, album_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id",
      values: [id, userId, albumId, createdAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteLike({ userId, albumId }) {
    const query = {
      text: "DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id",
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAlbumLikes(albumId) {
    const query = {
      text: `
        SELECT COUNT(*) 
        FROM user_album_likes
        WHERE album_id = $1
      `,
      values: [albumId],
    };

    const result = await this._pool.query(query);
    return result.rows[0].count;
  }

  async verifyUserLike({ userId, albumId }) {
    const query = {
      text: `
        SELECT * FROM user_album_likes
        WHERE user_id = $1 AND album_id = $2
      `,
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);
    return result.rows.length > 0;
  }
}

export default LikeRepositories;

import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../../../cache/redis-service.js";

class LikeRepositories {
  constructor() {
    this._pool = new Pool();
    this._cache = new CacheService();
  }

  async addLike({ userId, albumId }) {
    const id = "like-" + nanoid(16);
    const createdAt = new Date().toISOString();

    const query = {
      text: "INSERT INTO user_album_likes (id, user_id, album_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id",
      values: [id, userId, albumId, createdAt],
    };

    const result = await this._pool.query(query);

    // Invalidate cache when new like is added
    await this._cache.delete(`album:${albumId}:likes`);

    return result.rows[0];
  }

  async deleteLike({ userId, albumId }) {
    const query = {
      text: "DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id",
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    // Invalidate cache when like is removed
    await this._cache.delete(`album:${albumId}:likes`);

    return result.rows[0];
  }

  async getAlbumLikes(albumId) {
    try {
      // Try to get from cache first
      const cachedLikes = await this._cache.get(`album:${albumId}:likes`);
      return { likes: cachedLikes, fromCache: true };
      
    } catch (error) {
      // Cache miss, query from database
      const query = {
        text: `
          SELECT COUNT(*) 
          FROM user_album_likes
          WHERE album_id = $1
        `,
        values: [albumId],
      };

      const result = await this._pool.query(query);
      const likes = result.rows[0].count;
      
      // Store in cache for 30 minutes (1800 seconds)
      await this._cache.set(`album:${albumId}:likes`, likes, 1800);
      return { likes, fromCache: false };
    }
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

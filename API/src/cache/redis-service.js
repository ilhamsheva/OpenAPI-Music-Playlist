import { createClient } from "redis";

class CacheService {
    constructor() {
        this._client = createClient({
            socket: {
                host: process.env.REDIS_SERVER,
            }
        });

        this._client.on("error", (error) => {
            console.error("Redis Client Error", error);
        });

        this._client.connect().catch(err => {
            console.error("Failed to connect to Redis:", err.message);
        });
    }

    async set(key, value, expiration = 1800) {
        try {
            if (!this._client.isOpen) return;
            await this._client.set(key, value, { EX: expiration });
        } catch (error) {
            console.error("Redis set error:", error.message);
        }
    }

    async get(key) {
        if (!this._client.isOpen) throw new Error("Cache not available");
        const result = await this._client.get(key);
        if(result === null) throw new Error("Cache not found");
        return result;
    }

    async delete(key) {
        try {
            if (!this._client.isOpen) return;
            await this._client.del(key);
        } catch (error) {
            console.error("Redis delete error:", error.message);
        }
    }
}

export default CacheService;
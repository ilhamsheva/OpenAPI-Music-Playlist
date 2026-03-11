import { nanoid } from "nanoid";
import { Pool } from "pg";
import bcrypt from "bcrypt";

class UserRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createUser({ username, password, fullname }) {
        const id = "user-" + nanoid(16);
        const hashPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO users (id, username, password, fullname, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, username, hashPassword, fullname, createdAt, updatedAt],
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async verifyUser(username) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this.pool.query(query);
        return result.rows.length > 0;
    }

    async verifyUserCredential(username, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this.pool.query(query);
        
        if (!result.rows.length) {
            return null;
        }

        const {id, password: hashPassword} = result.rows[0];
        const isValid = await bcrypt.compare(password, hashPassword);

        return !isValid ? null : id;
    }

    async getUserById(id) {
        const query = {
            text: 'SELECT id, username, fullname FROM users WHERE id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }
}

export default new UserRepositories();
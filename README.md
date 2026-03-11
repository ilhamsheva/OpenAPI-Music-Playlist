# OpenMusic API

RESTful API untuk aplikasi musik yang menyediakan fitur manajemen album, lagu, playlist, kolaborasi, dan sistem like dengan caching menggunakan Redis.

## Features

- **Authentication & Authorization**: JWT-based authentication dengan access dan refresh token
- **User Management**: Registrasi dan manajemen user
- **Album Management**: CRUD operations untuk album dengan upload cover image
- **Song Management**: CRUD operations untuk lagu
- **Playlist Management**: Membuat dan mengelola playlist dengan sistem kolaborasi
- **Collaboration**: Kolaborasi antar user pada playlist
- **Album Likes**: User dapat menyukai album dengan server-side caching (Redis)
- **Export Playlist**: Export playlist ke JSON via message queue (RabbitMQ)
- **File Upload**: Upload cover album dengan validasi ukuran dan tipe file
- **Server-side Caching**: Redis caching untuk optimasi performa pada fitur likes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Cache**: Redis
- **Message Queue**: RabbitMQ
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **File Upload**: Multer
- **Migration**: node-pg-migrate

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Redis
- RabbitMQ (optional, untuk fitur export)

## Installation

1. Clone repository
```bash
git clone <repository-url>
cd submission
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
HOST=localhost
PORT=3000

# Database
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=submission
PGHOST=localhost
PGPORT=5432

# JWT Secret
ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret

# RabbitMQ
RABBITMQ_SERVER=amqp://localhost

# SMTP (for email notifications)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password

# Redis
REDIS_SERVER=localhost
```

4. Run database migrations
```bash
npm run migrate up
```

5. Start Redis server
```bash
redis-server
```

6. Start RabbitMQ (optional)
```bash
# Using Docker
docker run -d --name rabbitmq -p 5672:5672 rabbitmq:3-management
```

7. Start the application
```bash
# Development
npm start

# Production
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /users` - Register new user
- `POST /authentications` - Login
- `PUT /authentications` - Refresh access token
- `DELETE /authentications` - Logout

### Albums
- `POST /albums` - Create album
- `GET /albums/{id}` - Get album detail with songs
- `PUT /albums/{id}` - Update album
- `DELETE /albums/{id}` - Delete album
- `POST /albums/{id}/covers` - Upload album cover (requires auth)

### Songs
- `POST /songs` - Create song
- `GET /songs` - Get all songs (with optional query params)
- `GET /songs/{id}` - Get song detail
- `PUT /songs/{id}` - Update song
- `DELETE /songs/{id}` - Delete song

### Playlists
- `POST /playlists` - Create playlist (requires auth)
- `GET /playlists` - Get user playlists (requires auth)
- `DELETE /playlists/{id}` - Delete playlist (requires auth)
- `POST /playlists/{id}/songs` - Add song to playlist (requires auth)
- `GET /playlists/{id}/songs` - Get playlist songs (requires auth)
- `DELETE /playlists/{id}/songs` - Remove song from playlist (requires auth)
- `GET /playlists/{id}/activities` - Get playlist activities (requires auth)

### Collaborations
- `POST /collaborations` - Add collaborator to playlist (requires auth)
- `DELETE /collaborations` - Remove collaborator (requires auth)

### Likes
- `POST /albums/{id}/likes` - Like/Unlike album (requires auth)
- `GET /albums/{id}/likes` - Get album likes count (with cache)

### Exports
- `POST /export/playlists/{id}` - Export playlist to email (requires auth)

## Database Schema

### Tables
- `users` - User data
- `authentications` - Refresh tokens
- `album` - Album data
- `songs` - Song data
- `playlists` - Playlist data
- `playlist_songs` - Playlist-song relations
- `collaborations` - Playlist collaborations
- `playlist_song_activities` - Playlist activity logs
- `user_album_likes` - Album likes with unique constraint per user

## Caching Strategy

Album likes menggunakan Redis caching dengan strategi:
- **TTL**: 30 menit (1800 seconds)
- **Cache Key**: `album:{albumId}:likes`
- **Invalidation**: Cache dihapus saat ada perubahan (like/unlike)
- **Header**: Response dari cache memiliki header `X-Data-Source: cache`

## Project Structure

```
submission/
├── migrations/          # Database migrations
├── src/
│   ├── cache/          # Redis cache service
│   ├── consumer/       # RabbitMQ consumer
│   ├── exceptions/     # Custom error classes
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # Route definitions
│   ├── security/       # JWT token manager
│   ├── server/         # Server configuration
│   ├── services/       # Business logic
│   │   ├── album/
│   │   ├── authentications/
│   │   ├── collaborations/
│   │   ├── exports/
│   │   ├── likes/
│   │   ├── playlists/
│   │   ├── songs/
│   │   ├── uploads/
│   │   ├── user/
│   │   └── validator/
│   └── utils/          # Utility functions
├── .env
├── package.json
└── server.js
```

## Scripts

```bash
npm start          # Start development server with nodemon
npm run start:prod # Start production server
npm run migrate    # Run database migrations
npm run lint       # Run ESLint
```

## Error Handling

API menggunakan custom error classes:
- `ClientError` (400) - Bad request
- `AuthenticationError` (401) - Unauthorized
- `AuthorizationError` (403) - Forbidden
- `NotFoundError` (404) - Resource not found
- `InvariantError` (400) - Validation error


# THANKS FOR ATTENTION :)
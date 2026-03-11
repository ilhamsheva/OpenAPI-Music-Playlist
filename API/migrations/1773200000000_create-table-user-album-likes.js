/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("user_album_likes", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    album_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("user_album_likes", "fk_user_album_likes.user_id_users.id", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("user_album_likes", "fk_user_album_likes.album_id_album.id", {
    foreignKeys: {
      columns: "album_id",
      references: "album(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("user_album_likes", "unique_user_album_like", {
    unique: ["user_id", "album_id"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("user_album_likes");
};

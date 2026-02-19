import pg from 'pg';

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
    pgm.createTable('songs', {
        id: {
            type: 'VARCHAR(75)',
            unique: true,
            primaryKey: true
        },
        title: {
            type: 'VARCHAR(255)',
            notNull: true
        },
        year: {
            type: 'INTEGER',
            notNull: true
        },
        genre: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        performer: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        duration: {
            type: 'INTEGER',
        },
        albumId: {
            type: 'VARCHAR(75)',
            references: 'album(id)',
            onDelete: 'CASCADE'
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('songs');
};

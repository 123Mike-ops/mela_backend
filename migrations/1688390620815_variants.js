/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('variants', {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
        size: { type: 'varchar(1000)', notNull: true },
        model:{ type: 'varchar(1000)', notNull: true },
        location_detail_id: {
            type: 'integer',
            references: 'locationDetails',
            notNull: true
          },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
        updatedAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      })
};

exports.down = pgm => {};

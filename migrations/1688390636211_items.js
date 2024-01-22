/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('items', {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
        itemType: { type: 'varchar(1000)', notNull: true },
        user_id: {
            type: 'integer',
            references: 'users',
            notNull: true
          },
        variant_id: {
            type: 'integer',
            references: 'variants',
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

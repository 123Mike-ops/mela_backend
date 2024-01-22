/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('locationDetails', {
    id: 'id',
    subcity: { type: 'varchar(1000)', notNull: true },
    woreda: { type: 'varchar(1000)', notNull: true },
    village:{ type: 'varchar(1000)', notNull: true },
    location_id: {
        type: 'integer',
        references: 'locations',
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

/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
      id: 'id',
      firstname: { type: 'varchar(1000)', notNull: true },
      lastname: { type: 'varchar(1000)', notNull: true },
      email: { type: 'varchar(1000)', unique: true},
      phone: { type: 'varchar(1000)', notNull: true },
      password: { type: 'varchar(1000)', notNull: true },
      role:{ type: 'varchar(1000)'},
      permissions:{type: 'text[]'},
      passwordResetToken: {type: 'varchar(1000)'},
      passwordResetExpires:{type: 'varchar(1000)'},
      passwordChangedAt:{type: 'timestamp'},
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
    pgm.createTable('tokens',{
      id:'id',
      token: { type: 'varchar(1000)', notNull: true },
  
    })
  }
  
exports.down = pgm => {};

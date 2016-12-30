'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Stuff', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    created_by: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}

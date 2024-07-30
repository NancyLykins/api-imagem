import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

const Sistema = sequelize.define(
  'sistema',
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id_sistema',
      primaryKey: true,
      autoIncrement: true,
    },
    nomeSistema: {
      field: 'nome_sistema',
      unique: true,
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    secretKey: {
      field: 'secret_key',
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Sistema;

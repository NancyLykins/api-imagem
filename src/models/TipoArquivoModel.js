import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const TipoArquivo = sequelize.define(
  'tipo_arquivo',
  {
    idTipoArquivo: {
      type: DataTypes.INTEGER,
      field: 'id_tipo_arquivo',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nomeTipoArquivo: {
      field: 'nome_tipo_arquivo',
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default TipoArquivo;

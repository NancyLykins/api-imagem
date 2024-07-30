/* eslint-disable import/extensions */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import TipoArquivo from './TipoArquivoModel.js';
import Sistema from './SistemaModel.js';

const Arquivo = sequelize.define(
  'arquivo',
  {
    idArquivo: {
      field: 'id_arquivo',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nomeArquivo: {
      field: 'nome_arquivo',
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    formatoArquivo: {
      field: 'formato_arquivo',
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    tamanhoArquivo: {
      field: 'tamanho_arquivo',
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    caminhoArquivo: {
      field: 'caminho_arquivo',
      type: DataTypes.STRING(150),
    },
    publico: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Arquivo.belongsTo(TipoArquivo, {
  as: 'tipo_arquivo',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_tipo_arquivo',
    name: 'idTipoArquivo',
  },
});

Arquivo.belongsTo(Sistema, {
  as: 'sistema',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_sistema',
    name: 'idSistema',
  },
});

export default Arquivo;

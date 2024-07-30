/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

import Arquivo from '../models/ArquivoModel.js';
import Sistema from '../models/SistemaModel.js';
import TipoArquivo from '../models/TipoArquivoModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function saveFile(file, systemName, fileType) {
  const timeStamp = new Date().getTime();
  const uploadDir = `${systemName}/${fileType}`;
  console.log(`\n\n\nUPLOAD DIR: ${uploadDir}\n\n\n`);
  const uploadPath = `${__dirname}/../../public/${uploadDir}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const path = `${uploadPath}/${timeStamp}_${file.name}`;
  file.mv(path);
  return path;
}

async function verifyTypeFile(file) {
  const fileType = file.mimetype.split('/')[0];
  const response = await TipoArquivo.findOne({ where: { nomeTipoArquivo: fileType } });
  if (response) {
    return response;
  }
  return TipoArquivo.create({ nomeTipoArquivo: fileType });
}

async function create(req, res) {
  try {
    const file = req.files.uploadFile;
    // eslint-disable-next-line prefer-destructuring
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1] || null;
    let system = jwt.verify(token, process.env.SECRET_KEY);

    system = await Sistema.findOne({ where: { id: system.id } });
    const systemName = system.nomeSistema;

    if (!systemName) {
      return res.status(404).send({ error: 'Sistema não encontrado' });
    }

    const tipoArquivo = await verifyTypeFile(file);
    const filePath = await saveFile(file, systemName, tipoArquivo.nomeTipoArquivo);
    const extencaoArquivo = file.name.split('.').pop();
    console.log(`FILE PATH: ${filePath},   -${filePath.length}`);
    const arquivoSalvo = await Arquivo.create({
      nomeArquivo: file.name,
      formatoArquivo: extencaoArquivo,
      tamanhoArquivo: file.size,
      caminhoArquivo: filePath,
      idTipoArquivo: tipoArquivo.idTipoArquivo,
      idSistema: system.id,
    });
    const response = jwt.sign({ idArquivo: arquivoSalvo.idArquivo }, process.env.SECRET_KEY);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export default {
  create,
};

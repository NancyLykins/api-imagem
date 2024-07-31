import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Arquivo from "../models/ArquivoModel.js";
import { fileURLToPath } from 'url';
import Sistema from '../models/SistemaModel.js';
import TipoArquivo from '../models/TipoArquivoModel.js';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getLink = async (req, res) => {
  try {
    const token = req.query.token;
    const decryptedToken = jwt.verify(token, process.env.SECRET_KEY);
    const idArquivo = decryptedToken.idArquivo;
    const response = await Arquivo.findOne({ where: { idArquivo }});
    if (!response) {
      return res.status(404).send({ error: 'Arquivo não encontrado' });
    }
    const caminhoArquivo = response.caminhoArquivo;
    const resolvedPath = `${process.env.API_HOST}:${process.env.API_PORT}${caminhoArquivo}`;
    
    return res.status(200).send({ link: resolvedPath });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getBase64 = async (req, res) => {
  try {
    const token = req.query.token;
    const decryptedToken = jwt.verify(token, process.env.SECRET_KEY);
    const idArquivo = decryptedToken.idArquivo;
    const response = await Arquivo.findOne({ where: { idArquivo }});
    if (!response) {
      return res.status(404).send({ error: 'Arquivo não encontrado' });
    }
    const caminhoArquivo = response.caminhoArquivo;
    const filePath = path.resolve(__dirname, `../../${caminhoArquivo}`);
    const arquivo = fs.readFileSync(filePath);
    const arquivoBase64 = Buffer.from(arquivo).toString('base64');

    return res.status(200).send({ base64: arquivoBase64 });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

async function saveFile(file, systemName, fileType) {
  const timeStamp = new Date().getTime();
  const uploadDir = `${systemName}/${fileType}`;
  const uploadPath = `${__dirname}/../../public/${uploadDir}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const path = `${uploadPath}/${timeStamp}_${file.name}`;
  file.mv(path);
  return path.replace(`${__dirname}/../..`, '');
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
    const fileName = filePath.split('/').pop();
    const arquivoSalvo = await Arquivo.create({
      nomeArquivo: fileName,
      formatoArquivo: extencaoArquivo,
      tamanhoArquivo: file.size,
      caminhoArquivo: filePath,
      idTipoArquivo: tipoArquivo.idTipoArquivo,
      idSistema: system.id,
    });
    const response = jwt.sign({ idArquivo: arquivoSalvo.idArquivo }, process.env.SECRET_KEY);
    return res.status(200).send({"hash": response});
  } catch (error) {
    return res.status(500).send({ error: error.message, errorA: error });
  }
}

export default {
  getLink,
  getBase64,
  create,
};

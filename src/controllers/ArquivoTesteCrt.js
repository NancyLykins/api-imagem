import fs from 'fs';
import jwt from 'jsonwebtoken';

import Arquivo from '../models/ArquivoModel';
import Sistema from '../models/SistemaModel';
import TipoArquivo from '../models/TipoArquivoModel';

async function saveFile(file, systemName, extension) {
  const types = {
    png: 'imagem',
    jpg: 'imagem',
    jpeg: 'imagem',
    svg: 'imagem',
    pdf: 'documento',
    doc: 'documento',
    docx: 'documento',
    xls: 'documento',
    xlsx: 'documento',
    ppt: 'documento',
    pptx: 'documento',
    txt: 'documento',
  };
  const fileType = types[extension];
  const timeStamp = new Date().getTime();
  const uploadDir = `${systemName}/${fileType}`;
  const uploadPath = `${__dirname}/../../public/${uploadDir}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const path = `${uploadPath}/${timeStamp}_${file.name}`;
  file.mv(path);
  return path;
}

async function verifyTypeFile(file) {
  const fileType = file.type;
  const response = await TipoArquivo.findOne({ where: { formatoArquivo: fileType } });
  if (response) {
    return response;
  }
  return TipoArquivo.create({ formatoArquivo: fileType });
}

async function create(req, res) {
  try {
    const file = req.files.uploadFile;
    // eslint-disable-next-line prefer-destructuring
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1] || null;
    const system = jwt.verify(token, process.env.SECRET_KEY);

    const systemName = await Sistema.findOne({ where: { idSistema: system.id } });

    // if (!system) {
    //   return res.status(404).send({
    //     error: 'system not found',
    //   });
    // }

    const tipoArquivo = await verifyTypeFile(file);
    const filePath = await saveFile(file, systemName, tipoArquivo.nomeTipoArquivo);
    const arquivoSalvo = await Arquivo.create({
      nomeArquivo: file.name,
      formatoArquivo: file.type,
      tamanhoArquivo: file.size,
      caminhoArquivo: filePath,
      idTipoArquivo: tipoArquivo.idTipoArquivo,
      idSistema: system.id,
    });
    const response = jwt.sign({idArquivo: arquivoSalvo.idArquivo}, process.env.SECRET_KEY);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export default {
  create,
};

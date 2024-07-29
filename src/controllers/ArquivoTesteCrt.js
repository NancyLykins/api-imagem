import fs from 'fs';
import Arquivo from '../models/ArquivoModel';
import Sistema from '../models/SistemaModel';
import TipoArquivo from '../models/TipoArquivoModel';

async function uploadFile(file, systemName, extension, fileName) {
  const types = {
    png: 'images',
    jpg: 'images',
    jpeg: 'images',
    svg: 'images',
    pdf: 'docs',
    doc: 'docs',
    docx: 'docs',
    xls: 'docs',
    xlsx: 'docs',
    ppt: 'docs',
    pptx: 'docs',
    txt: 'docs',
  };
  const fileType = types[extension];
  const timeStamp = new Date().getTime();
  const uploadDir = `${systemName}/${fileType}`;
  const uploadPath = `${__dirname}/../../public/${uploadDir}`;

  if (!fs.existsSync(uploadPath)) { // verifica se um determinado caminho de diretório existe. Se não ele o cria, incluindo todos os diretórios necessários no caminho.
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const path = `${uploadPath}/${timeStamp}_${fileName}`;
  file.mv(path);
  return path;
}

async function verifySystem(systemName) {
  const response = await Sistema.findOne({ where: systemName });
  if (systemName) {
    return response;
  }
  return Sistema.create(systemName);
}

async function verifyTypeFile(file) {
  const fileType = file.type;
  const response = await TipoArquivo.findOne({ where: { formatoArquivo: fileType } });
  if (response) {
    return response;
  }
  return false;
}

async function create(req, res) {
  console.log(req.body);
  const data = req.body;
  const systemName = data.nomeSistema;
  //const { file } = data.files[0];

  const system = await verifySystem(systemName);
  if (!system) {
    return res.status(404).send({
      error: 'system not found',
    });
  }

  const extension = await verifyTypeFile(file);

  if (!extension) {
    return res.status(404).send({
      error: 'file type not valid',
    });
  }

  try {
    const filePath = await uploadFile(file, systemName, extension, file.name);

    const response = await Arquivo.create({
      nomeArquivo: file.name,
      formatoArquivo: file.type,
      tamanhoArquivo: file.size,
      caminhoArquivo: filePath,
      idTipoArquivo: extension.id,
      idSistema: system.id,
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({});
  }
}

export default {
  create,
};

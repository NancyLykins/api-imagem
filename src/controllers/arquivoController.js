import Arquivo from '../models/ArquivoModel';
import TipoArquivo from '../models/TipoArquivoModel';

const get = async (req, res) => {
  try {
    const idArquivo = req.params.idArquivo ? req.params.idArquivo.toString().replace(/\D/g, '') : null;

    if (!idArquivo) {
      const response = await Arquivo.findAll({
        order: [['idArquivo', 'asc']],
      });
      response.forEach(arquivo => { arquivo.caminhoArquivo = arquivo.caminhoArquivo ? `${process.env.API_HOST}:${process.env.API_PORT}/${arquivo.caminhoArquivo}` : ''; });

      return res.status(200).send({
        type: 'success',
        message: 'Lista de arquivos carregada com sucesso',
        data: response,
      });
    }

    const arquivo = await Arquivo.findOne({ where: { idArquivo } });

    if (!arquivo) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${idArquivo}`,
        data: [],
      });
    }

    arquivo.caminhoArquivo = arquivo.caminhoArquivo ? `${process.env.API_HOST}:${process.env.API_PORT}/${arquivo.caminhoArquivo}` : '';

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: arquivo,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

// If para verificar se o sistema existe e outro para se o tipo arquivo, caso sim criar.

const create = async (dados, res) => {
  const {
    nomeArquivo, formatoArquivo, tamanhoArquivo, caminhoArquivo,
    idTipoArquivo, idSistema, nomeTipoArquivo,
  } = dados;

  try {

    const response = await TipoArquivo.findOne({ where: { nomeTipoArquivo } });

    if (!response) {
      const tipoArquivo = await TipoArquivo.create({ nomeTipoArquivo });
      
      const responseArquivo = await Arquivo.create({
        nomeArquivo,
        formatoArquivo,
        tamanhoArquivo,
        caminhoArquivo,
        idTipoArquivo,
        idSistema,
      });

      return res.status(200).send({
        type: 'success',
        message: 'Cadastro realizado com sucesso',
        data: responseArquivo,
      });
    }
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro ao cadastrar',
      error: error.message,
    });
  }
};

const update = async (idArquivo, dados, res) => {
  try {
    const response = await Arquivo.findOne({ where: { idArquivo } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${idArquivo} para atualizar`,
        data: [],
      });
    }

    Object.keys(dados).forEach((field) => {
      response[field] = dados[field];
    });

    await response.save();

    return res.status(200).send({
      type: 'success',
      message: `Registro id ${idArquivo} atualizado com sucesso`,
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro ao atualizar',
      error: error.message,
    });
  }
};

const persist = async (req, res) => {
  try {
    const idArquivo = req.params.idArquivo ? req.params.idArquivo.toString().replace(/\D/g, '') : null;

    if (!idArquivo) {
      return await create(req.body, res);
    }

    return await update(idArquivo, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const idArquivo = req.params.idArquivo ? req.params.idArquivo.toString().replace(/\D/g, '') : null;

    if (!idArquivo) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const arquivo = await Arquivo.findOne({ where: { idArquivo } });

    if (!arquivo) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${idArquivo} para deletar`,
        data: [],
      });
    }

    await arquivo.destroy();

    return res.status(200).send({
      type: 'success',
      message: `Registro id ${idArquivo} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro ao deletar',
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
};

/*
  import fs from "fs";

  async function create(data){
    const systemName = data.systemName;
    const file = data.file;

    const system = verifySystem(systemName);
    if(!system){
      return res.status(404).send({
        error: "system not found",
      });
    }
    const fileType = verifyTypeFile(file);
    if(!fileType){
      return res.status(404).send({
        error: "file type not valid",
      });
    }

    try {
      const !!!! = await uploadFile(file, fileType, file.name);
      const response = await Arquivo.create({
        nomeArquivo: file.name,
        formatoArquivo: file.type,
        tamanhoArquivo: file.size,
        caminhoArquivo: path,
        idTipoArquivo: fileType.id,
        idSistema: system.id,
      });
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send({});
    }
 }

  async function uploadFile(file, fileType, fileName){
    const types = {
      'png': 'images',
      'jpg': 'images',
      'jpeg': 'images',
      'svg': 'images',
      'pdf': 'docs',
      'doc': 'docs',
      'docx': 'docs',
      'xls': 'docs',
      'xlsx': 'docs',
      'ppt': 'docs',
      'pptx': 'docs',
      'txt': 'docs',
    };
    fileType = types[fileType];
    const timeStamp = new Date().getTime();
    const uploadDir = `${systemName}/${fileType}`;
    const uploadPath = `${__dirname}/../../public/${uploadDir}`;

    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const path = `${uploadPath}/${timeStamp}_${fileName}`;
    file.mv(path);
  }

  function verifySystem(systemName){
    //exemplo
    const formatedsystemName = systemName.toLowerCase().replace(' ', '_');
    const response = select * from system where systemName = formatedSystemName;
    if(systemName){
      return response;
    } else {
      return false;
    }
  }

  function verifyTypeFile(file){
    const fileType = file.type;
    const response = select * from fileType where fileType = fileType;
    if(response){
      return response;
    } else {
      return false;
    }
  }


*/
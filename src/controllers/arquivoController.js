import Arquivo from '../models/ArquivoModel';

const get = async (req, res) => {
  try {
    const idArquivo = req.params.idArquivo ? req.params.idArquivo.toString().replace(/\D/g, '') : null;

    if (!idArquivo) {
      const response = await Arquivo.findAll({
        order: [['idArquivo', 'asc']],
      });
      response.forEach(arquivo => { arquivo.urlImagemPais = arquivo.urlImagemPais ? `${process.env.API_HOST}:${process.env.API_PORT}/${arquivo.urlImagemPais}` : ''; });

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

    arquivo.urlImagemPais = arquivo.urlImagemPais ? `${process.env.API_HOST}:${process.env.API_PORT}/${arquivo.urlImagemPais}` : '';

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

const create = async (dados, res) => {
  const {
    nomeArquivo, formatoArquivo, tamanhoArquivo, caminhoArquivo, idTipoArquivo, idSistema,
  } = dados;

  try {
    const response = await Arquivo.create({
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
      data: response,
    });
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
    const arquivo = await Arquivo.findOne({ where: { idArquivo } });

    if (!arquivo) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${idArquivo} para atualizar`,
        data: [],
      });
    }

    Object.keys(dados).forEach((field) => {
      arquivo[field] = dados[field];
    });

    await arquivo.save();

    return res.status(200).send({
      type: 'success',
      message: `Registro id ${idArquivo} atualizado com sucesso`,
      data: arquivo,
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

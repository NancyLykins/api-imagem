import TipoArquivo from '../models/TipoArquivoModel';

const get = async (req, res) => {
  try {
    const idTipoArquivo = req.params.idTipoArquivo ? req.params.idTipoArquivo.toString().replace(/\D/g, '') : null;

    if (!idTipoArquivo) {
      const response = await TipoArquivo.findAll({
        order: [['idTipoArquivo', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await TipoArquivo.findOne({ where: { idTipoArquivo } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com idTipoArquivo ${idTipoArquivo}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
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
    nomeTipoArquivo,
  } = dados;

  const response = await TipoArquivo.create({
    nomeTipoArquivo,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (idTipoArquivo, dados, res) => {
  const response = await TipoArquivo.findOne({ where: { idTipoArquivo } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com idTipoArquivo ${idTipoArquivo} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => (response[field] = dados[field]));

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro idTipoArquivo ${idTipoArquivo} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const idTipoArquivo = req.params.idTipoArquivo ? req.params.idTipoArquivo.toString().replace(/\D/g, '') : null;

    if (!idTipoArquivo) {
      return await create(req.body, res);
    }

    return await update(idTipoArquivo, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const idTipoArquivo = req.params.idTipoArquivo ? req.params.idTipoArquivo.toString().replace(/\D/g, '') : null;
    if (!idTipoArquivo) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um idTipoArquivo para deletar o registro',
        data: [],
      });
    }

    const response = await TipoArquivo.findOne({ where: { idTipoArquivo } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com idTipoArquivo ${idTipoArquivo} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro idTipoArquivo ${idTipoArquivo} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

export default {
  get,
  update,
  persist,
  destroy,
};
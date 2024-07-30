import Arquivo from "../models/ArquivoModel";

const get = async (req, res) => {
  try {
    const idArquivo = req.params.idArquivo ? req.params.idArquivo.toString().replace(/\D/g, '') : null;

    if (!idArquivo) {
      const response = await Arquivo.findAll({
        order: [['idArquivo', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    } 

    const response = await Arquivo.findOne({ where: { idArquivo } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com idArquivo ${idArquivo}`,
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
import fs from 'fs';
import path from 'path';
import Arquivo from '../models/ArquivoModel';

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
    
   /*  const caminhoArquivo = path.resolve(__dirname, `../public/${response.nomeTipoArquivo}/${response.nomeSistema}/${response.id}${response.extensao}`);
    
    const content = fs.readFileSync(
      path.resolve(__dirname, caminhoArquivo),
      'binary',
    ); */

  
    /* content = new Buffer(string).toString('base64');
    console.log(content);  */
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
};

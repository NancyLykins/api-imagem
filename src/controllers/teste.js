import jwt from 'jsonwebtoken';
import Arquivo from "../models/ArquivoModel.js";
import ArquivoTesteCrt from './ArquivoTesteCrt.js';

const get = async (req, res) => {
  const token = req.query.token;
  const decriptedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idArquivo = decriptedToken.idArquivo;
  const response = await Arquivo.findOne({ where: { idArquivo }});
  const path = response.caminhoArquivo;
  const resolvedPath = `${process.env.API_HOST}:${process.env.API_PORT}${path}`;
  const arquivoBase64 = fileContent.toString('base64');
  return res.status(200).send({ "link" : resolvedPath, "base64": arquivoBase64 });
};

export default {
  get,
};

// import Pais from '../models/Pais';
// import uploadUtil from '../utils/uploadUtil';
// import uploadFile from "../utils/uploadFile";

// const fs = require('fs');

// const get = async (req, res) => {
//   try {
//     const idPais = req.params.idPais ? req.params.idPais.toString().replace(/\D/g, '') : null;

//     if (!idPais) {
//       const response = await Pais.findAll({
//         order: [['idPais', 'ASC']],
//       });

//       response.forEach((pais) => {
//         pais.urlImagemPais = pais.urlImagemPais ? `${process.env.API_HOST} : ${process.env.API_PORT}/${pais.urlImagemPais}` : '';
//       });

//       return res.status(200).send({
//         type: 'success',
//         message: 'Registros carregados com sucesso',
//         data: response,
//       });
//     }

//     const response = await Pais.findOne({ where: { idPais } });

//     if (!response) {
//       return res.status(200).send({
//         type: 'error',
//         message: `Nenhum registro com id ${idPais}`,
//         data: [],
//       });
//     }

//     response.urlImagemPais = response.urlImagemPais
//       ? `${process.env.API_HOST}:${process.env.API_PORT}/${response.urlImagemPais}`
//       : '';

//     return res.status(200).send({
//       type: 'success',
//       message: 'Registro carregado com sucesso',
//       data: response,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       type: 'error',
//       message: 'Ops! Ocorreu um erro',
//       data: error.message,
//     });
//   }
// };

// const persist = async (req, res) => {
//   try {
//     const idPais = req.params.idPais ? req.params.idPais.toString().replace(/\D/g, '') : null;

//     if (!idPais) {
//       return await create(req, res);
//     }

//     return await update(idPais, req, res);
//   } catch (error) {
//     return res.status(200).send({
//       type: 'error',
//       message: 'Ops! Ocorreu um erro',
//       data: error,
//     });
//   }
// };

// const create = async (req, res) => {
//   const { dados } = req.body;

//   const response = await Pais.create({
//     dados,
//     urlImagemPais: '',
//   });

//   if (req.files && req.files.uploadFile) {
//     const upload = await uploadUtil(req.files.uploadFile, {
//       id: response.idPais,
//       tipo: 'images',
//       tabela: 'pais',
//     });

//     if (upload.type !== 'success') {
//       await response.destroy();
//       return res.status(200).send({
//         type: 'error',
//         message: 'O ocorreu um erro ao realizar o upload da imagem',
//         data: [],
//       });
//     }

//     response.urlImagemPais = upload.path;

//     await response.save();
//   }

//   return res.status(200).send({
//     type: 'success',
//     message: 'Cadastro realizado com sucesso',
//     data: response,
//   });
// };

// export default {
//   get,
//   persist,
//   create,
// };

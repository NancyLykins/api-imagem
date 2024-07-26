// import Pais from "../models/Pais"
// import uploadUtil from "../utils/uploadUtil";
// var fs = require('fs');

// const get = async (req, res) => {
//   try {
//     let idPais = req.params.idPais ? req.params.idPais.toString().replace(/\D/g, '') : null;

//     if (!idPais) {
//       let response = await Pais.findAll({
//         order: [['idPais', 'ASC']]
//       });

//       response.forEach(pais => {
//         pais.urlImagemPais = pais.urlImagemPais 
//           ? `${process.env.API_HOST}:${process.env.API_PORT}/${pais.urlImagemPais}`
//           : ''
//       });

//       return res.status(200).send({
//         type: 'success',
//         message: 'Registros carregados com sucesso',
//         data: response
//       });
//     };

//     let response = await Pais.findOne({ where: { idPais } });

//     if (!response) {
//       return res.status(200).send({
//         type: 'error',
//         message: `Nenhum registro com id ${idPais}`,
//         data: []
//       });
//     }

//     response.urlImagemPais = response.urlImagemPais 
//       ? `${process.env.API_HOST}:${process.env.API_PORT}/${response.urlImagemPais}`
//       : '';

//     return res.status(200).send({
//       type: 'success',
//       message: 'Registro carregado com sucesso',
//       data: response
//     });
//   } catch (error) {
//     return res.status(200).send({
//       type: 'error',
//       message: `Ops! Ocorreu um erro`,
//       data: error.message
//     });
//   }
// }

// const persist = async (req, res) => {
//   try {
//     let idPais = req.params.idPais ? req.params.idPais.toString().replace(/\D/g, '') : null;

//     if (!idPais) {
//       return await create(req, res)
//     }

//     return await update(idPais, req, res)
//   } catch (error) {
//     return res.status(200).send({
//       type: 'error',
//       message: `Ops! Ocorreu um erro`,
//       data: error
//     });
//   }
// }

// const create = async (req, res) => {
//   let { nomePais } = req.body;

//   let response = await Pais.create({
//     nomePais,
//     urlImagemPais: ``
//   });

//   if (req.files && req.files.uploadFile) {
//     let upload = await uploadUtil(req.files.uploadFile, {
//       id: response.idPais,
//       tipo: 'images',
//       tabela: 'pais'
//     });
  
//     if (upload.type !== 'success') {
//       await response.destroy();
//       return res.status(200).send({
//         type: 'error',
//         message: `O ocorreu um erro ao realizar o upload da imagem`,
//         data: []
//       });
//     }
  
//     response.urlImagemPais = upload.path;

//     await response.save();
//   }

//   return res.status(200).send({
//     type: 'success',
//     message: `Cadastro realizado com sucesso`,
//     data: response
//   });
// }

// const update = async (idPais, req, res) => {
//   let response = await Pais.findOne({ where: { idPais } });

//   if (!response) {
//     return res.status(200).send({
//       type: 'error',
//       message: `Nenhum registro com id ${idPais} para atualizar`,
//       data: []
//     });
//   }

//   Object.keys(req.body).forEach(field => response[field] = req.body[field]);

//   let filePath = response.urlImagemPais ? `${__dirname}/../../${response.urlImagemPais}` : null;

//   if (req.files) {
//     if (filePath && fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     };

//     let upload = await uploadUtil(req.files.uploadFile, {
//       id: response.idPais,
//       tipo: 'images',
//       tabela: 'pais'
//     });

//     if (upload.type !== 'success') {
//       await response.destroy();
//       return res.status(200).send({
//         type: 'error',
//         message: 'Ocorreu um erro ao realizar o upload da imagem',
//         data: []
//       })
//     }
//     response.urlImagemPais = upload.path;
//   }

//   await response.save();
//   return res.status(200).send({
//     type: 'success',
//     message: `Registro id ${response.idPais} atualizado com sucesso`,
//     data: response
//   });
// }

// const destroy = async (req, res) => {
//   try {
//     let idPais = req.body.idPais ? req.body.idPais.toString().replace(/\D/g, '') : null;
//     if (!idPais) {
//       return res.status(200).send({
//         type: 'error',
//         message: `Informe um id para deletar o registro`,
//         data: []
//       });
//     }

//     let response = await Pais.findOne({ where: { idPais } });

//     if (!response) {
//       return res.status(200).send({
//         type: 'error',
//         message: `Nenhum registro com id ${idPais} para deletar`,
//         data: []
//       });
//     }

//     let filePath = response.urlImagemPais ? `${__dirname}/../../${response.urlImagemPais}` : null;
//     if (response.urlImagemPais && fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     };

//     await response.destroy();
//     return res.status(200).send({
//       type: 'success',
//       message: `Registro id ${response.idPais} deletado com sucesso`,
//       data: []
//     });
//   } catch (error) {
//     return res.status(200).send({
//       type: 'error',
//       message: `Ops! Ocorreu um erro`,
//       error: error.message
//     });
//   }
// }

// export default {
//   get,
//   persist,
//   destroy
// }
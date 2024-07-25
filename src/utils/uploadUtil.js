// import path from 'path';

// /**
//  * @param file Deve ser um arquivo presente no req.files
//  * @param params Deve ser um objeto contendo {id, tipo, tabela}.
//  *  id: Chave primária da registro que está sendo salvo.
//  *  tipo: 'images' ou 'docs'.
//  *  tabela: Nome da tabela do registro que está sendo salvo
//  * @return Objeto contendo type, message e caso success, o caminho da imagem salva no servidor
//  */
// export default async (file, params) => {
//   try {
//     let extensao = path.extname(file.name) //extname é utilizada para extrair a extensão do arquivo
//     if (extensao != '.jpg' && extensao != '.png' && extensao != '.jpeg' && extensao != '.svg' && extensao != '.pdf' && extensao != '.doc' && extensao != '.docx' && extensao != '.xls' && extensao != '.xlsx' && extensao != '.ppt' && extensao != '.pptx' && extensao != '.txt'){
//       return {
//         type: 'error',
//         message: `O arquivo enviado não é uma imagem ou documento válido`,
//         data: []
//       };
//     }
//     let filePath = `public/${params.nomeTipoArquivo}/${params.nomeSistema}/${params.id}${extensao}`
//     let uploadPath = `${__dirname}/../../${filePath}`;
//     file.mv(uploadPath);
//     return {
//       type: 'success',
//       message: 'Upload de arquivo realizado com sucesso',
//       path: filePath
//     }
//   } catch (error) {
//     return {
//       type: 'error',
//       message: 'Erro ao fazer upload do arquivo',
//     }
//   }
// }
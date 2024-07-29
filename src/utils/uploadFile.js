import path from 'path';

/**
 * @param file Deve ser um arquivo presente no req.files
 * @param params Deve ser um objeto contendo {id, tipo, tabela}.
 *  id: Chave primária da registro que está sendo salvo.
 *  tipo: 'images' ou 'docs'.
 *  tabela: Nome da tabela do registro que está sendo salvo
 * @return Objeto contendo type, message e caso success, o caminho da imagem salva no servidor
 */
export default async (file, params) => {
  try {
    const extensao = path.extname(file.name);
    const filePath = `public/${params.nomeTipoArquivo}/${params.nomeSistema}/${params.id}${extensao}`;
    const uploadPath = `${__dirname}/../../${filePath}`;
    file.mv(uploadPath);
    return {
      type: 'success',
      message: 'Upload de arquivo realizado com sucesso',
      path: filePath,
    };
  } catch (error) {
    return {
      type: 'error',
      message: 'Erro ao fazer upload do arquivo',
    };
  }
};

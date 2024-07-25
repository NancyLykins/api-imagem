import tipoArquivo from '../controllers/tipoArquivoController';

export default (app) => {
  app.post('/tipo-arquivo/persist', tipoArquivo.persist);
  app.patch('/tipo-arquivo/persist/:idTipoArquivo', tipoArquivo.persist);
  app.delete('/tipo-arquivo/destroy/:idTipoArquivo', tipoArquivo.destroy);
  app.patch('/tipo-arquivo/update', tipoArquivo.update);
  app.get('/tipo-arquivo', tipoArquivo.get);
  app.get('/tipo-arquivo/:idTipoArquivo', tipoArquivo.get);
};

import arquivo from '../controllers/arquivoController.js';

export default (app) => {
  app.post('/arquivo/persist', arquivo.persist);
  app.patch('/arquivo/persist/:idArquivo', arquivo.persist);
  app.delete('/arquivo/destroy/:idArquivo', arquivo.destroy);
  app.get('/arquivo', arquivo.get);
  app.get('/arquivo/:id', arquivo.get);
};

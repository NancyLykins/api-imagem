import arquivo from '../controllers/arquivoController.js';

export default (app) => {
  app.post('/imagem/create', arquivo.create);
  app.get('/imagem/link', arquivo.getLink);
  app.get('/imagem/base64', arquivo.getBase64);
};

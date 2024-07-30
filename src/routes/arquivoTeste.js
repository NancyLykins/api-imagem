import arquivoTeste from '../controllers/ArquivoTesteCrt.js';

export default (app) => {
  app.post('/arquivo-teste/create', arquivoTeste.create);
};

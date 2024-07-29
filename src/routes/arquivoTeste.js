import arquivoTeste from '../controllers/ArquivoTesteCrt';

export default (app) => {
  app.post('/arquivo-teste/create', arquivoTeste.create);
};

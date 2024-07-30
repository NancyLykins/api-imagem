import teste from '../controllers/teste.js';

export default (app) => {
  app.get('/imagem', teste.get);
};

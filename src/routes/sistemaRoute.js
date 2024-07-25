import sistema from '../controllers/sistemaController';

export default (app) => {
  app.post('/sistema/persist', sistema.persist);
  app.patch('/sistema/persist/:id', sistema.persist);
  app.delete('/sistema/destroy/:id', sistema.destroy);
  app.patch('/sistema/update', sistema.update);
  app.get('/sistema', sistema.get);
  app.get('/sistema/:id', sistema.get);
};

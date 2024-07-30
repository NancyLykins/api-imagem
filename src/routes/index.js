import tipoArquivoRoute from './tipoArquivoRoute.js';
import sistemaRoute from './sistemaRoute.js';
import arquivoRoute from './arquivoRoute.js';
import arquivoTeste from './arquivoTeste.js';
import testeRoute from './testeRoute.js';

function Routes(app) {
  tipoArquivoRoute(app);
  sistemaRoute(app);
  arquivoRoute(app);
  arquivoTeste(app);
  testeRoute(app);
}

export default Routes;

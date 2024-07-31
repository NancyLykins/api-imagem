import tipoArquivoRoute from './tipoArquivoRoute.js';
import sistemaRoute from './sistemaRoute.js';
import arquivoRoute from './arquivoRoute.js';
import arquivoTeste from './arquivoTeste.js';

function Routes(app) {
  tipoArquivoRoute(app);
  sistemaRoute(app);
  arquivoRoute(app);
  arquivoTeste(app);
}

export default Routes;

import tipoArquivoRoute from './tipoArquivoRoute.js';
import sistemaRoute from './sistemaRoute.js';
import arquivoRoute from './arquivoRoute.js';

function Routes(app) {
  tipoArquivoRoute(app);
  sistemaRoute(app);
  arquivoRoute(app);
}

export default Routes;

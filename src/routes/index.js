import tipoArquivoRoute from './tipoArquivoRoute';
import sistemaRoute from './sistemaRoute';
import arquivoRoute from './arquivoRoute';

function Routes(app) {
  tipoArquivoRoute(app);
  sistemaRoute(app);
  arquivoRoute(app);
}

export default Routes;

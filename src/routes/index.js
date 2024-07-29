import tipoArquivoRoute from './tipoArquivoRoute';
import sistemaRoute from './sistemaRoute';
import arquivoRoute from './arquivoRoute';
import arquivoTeste from './arquivoTeste';

function Routes(app) {
  tipoArquivoRoute(app);
  sistemaRoute(app);
  arquivoRoute(app);
  arquivoTeste(app);
}

export default Routes;

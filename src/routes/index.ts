import { Router } from 'express';

import estadoRotas from './estado.routes';
import cidadeRotas from './cidade.routes';

const routes = Router();

routes.use('/estados', estadoRotas);
routes.use('/cidades', cidadeRotas);

export default routes;

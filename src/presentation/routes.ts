import { Router } from 'express';
import { KavakRoutes } from './kavak/kavak.routes';
import { FileUploadRoutes } from './file-upload/routes';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/sforceapi/kavak/auth', AuthRoutes.routes );
        router.use('/sforceapi/kavak/documents', KavakRoutes.routes );
        router.use('/sforceapi/kavak/upload', FileUploadRoutes.routes );


        return router;
    }

}
import { Router } from 'express';
import { KavakController } from './controllers/kavak.controller';

export class KavakRoutes {

    static get routes(): Router {

        const router = Router();
        const kavakController = new KavakController();

        router.get('/:id', kavakController.getDataById );



        return router

    }

}
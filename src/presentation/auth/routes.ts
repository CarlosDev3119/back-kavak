import { Router } from 'express';
import { AuhtController } from './controller';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const authController = new AuhtController();

        router.post('/login', authController.register );



        return router

    }

}
import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';

import { Uuid } from '../../config';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';

export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const fileUploadService = new FileUploadService(Uuid.v4 );
        const kavakController = new FileUploadController(fileUploadService);

        
        router.use( FileUploadMiddleware.containFiles )
        router.post('/single', kavakController.uploadFile );
        
        router.post('/multiple', kavakController.uploadMultipleFiles);


        return router

    }

}
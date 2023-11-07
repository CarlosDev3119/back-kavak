import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';

export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();
        const kavakController = new FileUploadController(
            new FileUploadService()
        );

        
        router.use( FileUploadMiddleware.containFiles )
        router.post('/single', kavakController.uploadFile );
        
        router.post('/multiple', kavakController.uploadMultipleFiles);

   



        return router

    }

}
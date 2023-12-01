import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { GoogleDriveService } from '../services/google-drive.service';
import { Uuid } from '../../config';

export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const googleService = new GoogleDriveService();
        const fileUploadService = new FileUploadService(Uuid.v4, googleService);
        const kavakController = new FileUploadController(fileUploadService);

        
        router.use( FileUploadMiddleware.containFiles )
        router.post('/single', kavakController.uploadFile );
        
        router.post('/multiple', kavakController.uploadMultipleFiles);

   



        return router

    }

}
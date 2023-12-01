import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';

import { GoogleDriveService } from '../services/google-drive.service';
import { Uuid } from '../../config';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';

export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const fileUploadService = new FileUploadService(Uuid.v4 );
        const googleService = new GoogleDriveService()
        const kavakController = new FileUploadController(fileUploadService, googleService);

        
        router.use( FileUploadMiddleware.containFiles )
        router.post('/single', kavakController.uploadFile );
        
        router.post('/multiple', kavakController.uploadMultipleFiles);

        router.post('/drive', kavakController.readFiles);



        return router

    }

}
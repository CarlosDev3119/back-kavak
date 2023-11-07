

import { Request, Response } from 'express';
import { FileUploadService } from '../services/file-upload.service';
import { Observable, of, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import path from 'path';

const keys = [
    'talon',
    'calcomania_verificacion',
    'tarjeta_circulacion',
    'placa_auto',
    'placa_engomado',
    'vin_parabrisas',
    'vin_carroceria',
    'no_motor',
    'calcomania_repuve',
    'tacometro',
    'vin_escanner',
    'km_escanner',
]

export class FileUploadController {

    constructor(
        private readonly fileUploadService: FileUploadService,
    ){}


    public uploadFile = async (req: Request, res: Response) => {


        try {    
          
            const file = req.body.files.at(0) as UploadedFile;
    
            const data = await this.fileUploadService.uploadSingle( file )
              
            
            res.json({
                message: 'upload file',
                data
                
            })
            
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }


    }

    public uploadMultipleFiles = async (req: Request, res: Response) => {

        
        try {
    
          
            const files = req.body.files as UploadedFile[];
            
            
            const data = await this.fileUploadService.uploadMultiple( files )
            
            const dataFiles = this.fileUploadService.setFiles(keys, data)
            const folder = path.resolve( __dirname, '../../../', 'uploads' );
            
            this.deleteFolderContentsAfterDelay(folder, 120);

            res.json({
                message: 'upload files',
                data: {
                    dataSaved: data,
                    missingData: dataFiles
                }
                
            })

    
                    
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }


    }

    private deleteFolderContentsAfterDelay(folderPath: string, delayInSeconds: number) {
        
        const delayObservable = timer(delayInSeconds * 1000);
    
        delayObservable.pipe(
            switchMap(() => {
                return new Observable<void>((observer) => {
                    // Eliminar contenido de la carpeta
                    fs.readdir(folderPath, (err, files) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            files.forEach((file) => {
                                const filePath = `${folderPath}/${file}`;
                                fs.unlink(filePath, (err) => {
                                    if (err) {
                                        observer.error(err);
                                    }
                                });
                            });
                            observer.complete();
                        }
                    });
                });
            }),
            catchError((err) => {
                console.error('Error deleting folder contents:', err);
                return of();
            })
        ).subscribe(() => {
            console.log(`Content in '${folderPath}' deleted after ${delayInSeconds} seconds.`);
        });
    }

}
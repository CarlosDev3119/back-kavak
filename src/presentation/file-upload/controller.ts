

import { Request, Response } from 'express';
import { FileUploadService } from '../services/file-upload.service';

import { UploadedFile } from 'express-fileupload';
import path from 'path';
import * as fs from 'fs';
import { GoogleDriveService } from '../services/google-drive.service';


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
        private readonly googleDriveService: GoogleDriveService,
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

            const data = await this.fileUploadService.uploadMultiple( files );
                    
            res.json({
                message: 'upload files',
                data: {
                    dataSaved: data
                }
                
            })

    
                    
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }


    }

    public readFiles = async (req: Request, res: Response) => {
        const destination = path.resolve( __dirname, '../../../', 'uploads' );
        // console.log(destination);
        try {
            const contenidoDocumento = await fs.promises.readdir(destination);
            const contenidosArchivos = [];

            // Leer el contenido de cada archivo
            for (const archivo of contenidoDocumento) {
              const rutaDocumento = path.join(destination, archivo);
              const contenidoDocumento = await fs.promises.readFile(rutaDocumento);
              contenidosArchivos.push({ nombre: archivo, contenido: contenidoDocumento });
            }
            
           
            const data = await this.googleDriveService.uploadFileDrive( await this.googleDriveService.authorize(), 'image/jpg', contenidosArchivos[0].nombre, contenidosArchivos[0].contenido)
            // console.log(data);
            // Crear una respuesta JSON con la lista de contenidos de archivos
            // console.log(contenidosArchivos);

          } catch (error) {
            console.error(error);
          }
    }


}
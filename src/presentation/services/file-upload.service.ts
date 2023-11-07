import { UploadedFile } from "express-fileupload";
import path from "path";
import fs, { existsSync } from 'fs';
import { Uuid } from "../../config/uuid.adapter";

export class FileUploadService {
    constructor(
        private readonly uuid = Uuid.v4
    ){}

    private checkFolder( folderPath: string ){
        if( !existsSync(folderPath) ){
            fs.mkdirSync(folderPath);
        }
    }  
    
    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf'],
    ){
        
        try{
            
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            const name = file.name.split('.').at(0) ?? '';

            if( !validExtensions.includes(fileExtension)){
                throw new Error(`Invalid file extension: ${fileExtension} valid ones ${validExtensions}` );
            }

            const destination = path.resolve( __dirname, '../../../', folder );
            this.checkFolder(destination);

            const fileName = `${name}.${ fileExtension }`;
            

            file.mv(`${destination}/${fileName}`);

            return { fileName };

        }catch( error ){
            throw error;
            
        }

    }
    
    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf'] 
    ){
        const fileNames = await Promise.all(
            files.map( file => this.uploadSingle(file, folder, validExtensions))
        )

        return fileNames;
    }


    setFiles(
        keys: string[],
        files: {
            fileName: string;
        }[],
    ) {

        const data: Record<string, string> = {};
        files.forEach(archivo => {
            const fileName = archivo.fileName.toLowerCase();
        
            keys.forEach(key => {
                if (fileName.includes(key)) {
                    data[key] = archivo.fileName;
                }
            });
        });

        const archivosFaltantes = keys.filter(key => !data[key]);
        return archivosFaltantes;

    }
        
    
}
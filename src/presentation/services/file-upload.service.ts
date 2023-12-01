import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config/uuid.adapter";
import path from "path";

export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4,
    ){}

    
    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads/708085ea-e66a-481a-b063-a4e6c6cb3258',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf'],
    ){
        
        try{
            
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            const mimeType = file.mimetype;
            const name = file.name.split('.').at(0) ?? '';

            if( !validExtensions.includes(fileExtension)){
                throw new Error(`Invalid file extension: ${fileExtension} valid ones ${validExtensions}` );
            }

            const fileName = `${name}.${ fileExtension }`;
            
            const destination = path.resolve( __dirname, '../../../', folder );
            file.mv(`${destination}/${fileName}`);

            return { fileName };

        }catch( error ){
            throw error;
            
        }

    }
    
    
    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads/708085ea-e66a-481a-b063-a4e6c6cb3258',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf'] 
    ){
        const fileNames = await Promise.all(
            files.map( file => this.uploadSingle(file, folder, validExtensions))
        )

        return fileNames;
    }



    
}
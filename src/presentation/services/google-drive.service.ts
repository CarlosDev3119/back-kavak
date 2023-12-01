import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import { google } from 'googleapis';
import path from 'path';

const filePath = __dirname + '../../../data/google/kavac.json';
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];



export class GoogleDriveService {
    
    public getFileKeys = () => {

        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        return data;
    }   

    public authorize = async () => {

        const pkey = this.getFileKeys()
        
        const jwtClient = new google.auth.JWT(
            pkey.client_email,
            undefined,
            pkey.private_key,
            SCOPES
          )
          await jwtClient.authorize();
          return jwtClient;
    }

    public async uploadFileDrive(authClient: any, mymeType: string, fileName: string, fileContent: any){
        const drive = google.drive({ version: 'v3', auth: authClient });
    
        const base64Data = fileContent.toString('base64');
        const file = await drive.files.create({
            media: {
                body: base64Data,
                mimeType: mymeType 
            },
            fields: 'id',
            requestBody: {
                name: path.basename(fileName),
                parents: ["11Ol5i-nJEo8LjXRLRsKiSdyrstl7hYgH"]
            },
        });
       console.log(file);
    }


   
    

    
}
import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {
    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {

        const {port, routes, public_path = 'public'} = options;

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;

    }


    async start() {

        this.app.use( express.json() );

        this.app.use( cors() );

        this.app.use( express.urlencoded({ extended: true }));
        
        this.app.use( express.static( this.publicPath ) );
        
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));
        
        this.app.use( this.routes );


        this.listen();

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
        
    }
}
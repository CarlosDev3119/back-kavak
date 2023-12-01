import { Request, Response } from "express";



export class AuhtController {


    constructor(){}

    public register = (req: Request, res: Response) => {
        
        res.json('register user')

    }
}
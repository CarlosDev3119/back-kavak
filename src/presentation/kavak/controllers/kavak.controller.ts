

import { Request, Response } from 'express';
import { prisma } from '../../../data/mysql';
import { Kavakpoc } from '../interfaces/interfaces';


export class KavakController {



    public getDataById = async (req: Request, res: Response) => {

        try{
            
            const { id } = req.params;

            const dataKavak = await prisma.kavakpoc.findUnique({
                where: {
                    idkavakpoc: +id
                }
            }) as Kavakpoc;

            const {idkavakpoc, ...rest} = dataKavak;

            res.json({
                message: 'Success',
                data: rest
            })
        
        }catch(error){
            res.status(400).json({ message: 'An error occurred', error})
        }

    }

}
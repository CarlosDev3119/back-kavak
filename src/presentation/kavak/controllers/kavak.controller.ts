

import { Request, Response } from 'express';
import { prisma } from '../../../data/mysql';
import { Kavakpoc } from '../interfaces/interfaces';



export class KavakController {



    public getDataById = async (req: Request, res: Response) => {

        try{
            
            const { id } = req.params;

            const dataKavak = await prisma.kavakpoc.findUnique({
                where: {
                    idkavakpoc: id
                }
            }) as Kavakpoc;
            
            if(!dataKavak){
                return res.json({
                    message: 'Pending',
                    data: []
                })
            }

            const {idkavakpoc, ...rest} = dataKavak;

            res.json({
                message: 'Success',
                data: rest
            })
        
        }catch(error){
            res.status(400).json({ message: 'An error occurred', error})
        }

    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

}
import { Request, Response } from "express";
import axios from "axios";


const fetchRandomUsers = async(limit : number)=>{
    const response = await axios.get(`https://randomuser.me/api/?results=${limit}`);
    return response.data.results;
}

let cachedUsers : any[] = [];


export const getUsers = async (req: Request, res: Response) =>{
    try {
        const limit : number = parseInt(req.query.limit as string) || 10;

        //verificar si los users ya estan en cache y si la cantidad solicitada es menor o igual al tamaño de la cache
        if(cachedUsers.length >=limit){
            res.json(cachedUsers.slice(0, limit));
        }else{
            //si no hay suficientes users en cache, obtener mas de la API randomuser.me
            const users = await fetchRandomUsers(limit);
            cachedUsers = users;
            res.json({ cachedUsers });
        }
        

    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}
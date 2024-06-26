import { Request, Response } from "express";
import axios from "axios";


const fetchRandomUsers = async(limit : number): Promise<any[]>=>{
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${limit}`);
        return response.data.results.map((user: any) =>({
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            gender: user.gender
        }));
    } catch (error) {
        throw new Error('Error fetching users from randomuser.me API');
    }
}

let cachedUsers : any[] = [];

//controller para /user con filtro por genero
export const getUsers = async (req: Request, res: Response) =>{
    try {
        const limit : number = parseInt(req.query.limit as string) || 10;
        const categorizeBy : string = req.query.categorize as string;

        //verificar si los users ya estan en cache y si la cantidad solicitada es menor o igual al tamaño de la cache
        if(cachedUsers.length >=limit){
            res.json({ users: filterUsers(cachedUsers.slice(0, limit), categorizeBy)});
        }else{
            //si no hay suficientes users en cache, obtener mas de la API randomuser.me
            const users = await fetchRandomUsers(limit);
            cachedUsers = users;
            res.json({ users : filterUsers(cachedUsers, categorizeBy) });
        }
        

    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

//funcion para filtrar por genero
function filterUsers(users: any[], categorizeBy: string):any{
    const filteredUsers : any = {
        female: [],
        male: []
    };

    users.forEach(user =>{
        if(user.gender === 'female'){
            filteredUsers.female.push(user);
        }else if(user.gender === 'male'){
            filteredUsers.male.push(user);
        }

        return filteredUsers;
    });

    return filteredUsers;
}
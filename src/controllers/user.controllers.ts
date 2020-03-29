import {Request, Response} from 'express';
import { User } from '../entities/user';
import { getRepository } from 'typeorm';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find({isActive: true});
    return res.json(users);
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.json(results);
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(User).findOne(req.params.id);
    if(!results){
        return res.status(400).json({msg: 'User Not Found'});
    }
    return res.json(results);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }

    return res.status(404).json({msg: 'Not User Found'});
}

// export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
//     const results = await getRepository(User).delete(req.params.id);
//     return res.json(results);
// }

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, {isActive: false});
        const results = await getRepository(User).save(user);
        return res.json({msg: 'User Deleted'});
    }

    return res.status(404).json({msg: 'Not User Found'});
}
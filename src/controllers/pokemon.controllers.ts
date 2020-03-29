import {Request, Response} from 'express';
import { Pokemon } from '../entities/pokemon';
import { getRepository } from 'typeorm';
import { Type } from '../entities/type';

export const getPokes = async (req: Request, res: Response): Promise<Response> => {
    const pokes = await getRepository(Pokemon).find({relations: ['types']});
    return res.status(200).json(pokes);
}

export const createPoke = async (req: Request, res: Response): Promise<Response> => {
    let types = await getRepository(Type).findOne({name: req.body.types});
    if(!types){
        types = getRepository(Type).create({name: req.body.types});
        types = await getRepository(Type).save(types);
    }
    const newPoke = getRepository(Pokemon).create({ ...req.body, types: [types] });
    const results = await getRepository(Pokemon).save(newPoke);
    return res.json(results);
}

export const getPoke = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Pokemon).findOne(req.params.id);
    if(!results){
        return res.status(400).json({msg: 'Pokemon Not Found'});
    }
    return res.json(results);
}

export const updatePoke = async (req: Request, res: Response): Promise<Response> => {
    const poke = await getRepository(Pokemon).findOne(req.params.id);
    if(poke){
        getRepository(Pokemon).merge(poke, req.body);
        const results = await getRepository(Pokemon).save(poke);
        return res.json(results);
    }
    return res.status(400).json({msg: 'Pokemon Not Found'});
}

export const deletePoke = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Pokemon).delete(req.params.id);
    return res.json(results);
}


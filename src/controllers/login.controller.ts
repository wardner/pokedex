import {Request, Response} from 'express';
import { User } from '../entities/user';
import { getRepository } from 'typeorm';
let jwt = require('jsonwebtoken');

export const logIn = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({msg: 'User Email Incorrect'});
    }

    if (!user.comparePassword(req.body.password)){
        return res.status(400).json({msg: 'User Password Incorrect'});
    }

    let token = jwt.sign({ user }, 'Seed-Desarrollo', {expiresIn: 60 * 60 * 24 * 30});

    return res.status(200).json({
        user,
        msg: 'User LogedIn Succefully',
        token
    });
}

import {Router} from 'express';
import { logIn } from '../controllers/login.controller';

const router = Router();

router.route('/').post(logIn);

export default router;
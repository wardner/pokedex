import {Router} from 'express';
import { getPoke, getPokes, createPoke, updatePoke, deletePoke } from '../controllers/pokemon.controllers';
import {tokenValidator} from '../middleware/auth'
const router = Router();

router.route('/').get(tokenValidator, getPokes).post(tokenValidator, createPoke);
router.route('/:id').get(getPoke).put(updatePoke).delete(deletePoke);

// router.post('/', createPoke);
// router.get('/:id', getPoke);
// router.put('/:id', updatePoke);
// router.delete('/:id', deletePoke);


export default router;
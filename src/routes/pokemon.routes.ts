import {Router} from 'express';
import { getPoke, getPokes, createPoke, updatePoke, deletePoke } from '../controllers/pokemon.controllers';
const router = Router();

router.route('/').get(getPokes).post(createPoke);
router.route('/:id').get(getPoke).put(updatePoke).delete(deletePoke);

// router.post('/', createPoke);
// router.get('/:id', getPoke);
// router.put('/:id', updatePoke);
// router.delete('/:id', deletePoke);


export default router;
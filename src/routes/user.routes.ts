import {Router} from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/user.controllers';
const router = Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

// router.get('/', getUsers);
// router.get('/users/:id', getUser);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
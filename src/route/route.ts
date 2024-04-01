import express from 'express';
import { getUsers } from '../controller/users.controller';
import { getDrink } from '../controller/usersDrinkController';

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/drink', getDrink);

export default router;
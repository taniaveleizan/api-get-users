import express from 'express';
import { getDrink, getUsers } from '../controller/users.controller';

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/drink', getDrink);

export default router;
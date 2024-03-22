import express from 'express';
import { getUsers } from '../controller/users.controller';

const router = express.Router();

router.get('/users', getUsers);

export default router;
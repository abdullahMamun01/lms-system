import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authoRization } from '../middlewares/authorization';

const router = express.Router();

// Define user routes
router.get('/courses', authoRization('USER'), UserController.getUsersCourses);

export default router;

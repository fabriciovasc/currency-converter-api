import { Router } from 'express';
import mainRouter from './main.route';

const router: Router = Router();

router.use('/', mainRouter);

export default router;

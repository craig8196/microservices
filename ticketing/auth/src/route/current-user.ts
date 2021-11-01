import express from 'express';
import { currentUserHandler } from '../middleware/current-user-handler';


const router = express.Router();

router.get('/api/users/currentuser', currentUserHandler, async (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };


import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY!;
const router = express.Router();

router.get('/api/users/currentuser', async (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      JWT_KEY
    );
    res.send({ currentuser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };


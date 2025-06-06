// server/routes/userRoutes.js
import { Router } from 'express';
import { success } from '../utils/response.js';
import { createSession, removeSession } from '../auth/session.js';
import { getUser, createUser } from '../database/user.js';

const router = Router();

router.get('/profile', async (req, res) => {
  const { uid } = req.session;
  const user = await getUser(uid);

  res.json(success(user));
})

router.post('/login', async (req, res) => {
  const { uid } = req.body;
  
  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }
  
  const user = await getUser(uid);
  const { token, session } = createSession(uid);
  req.session = session;
  
  res.json(success({
      token,
      user
  }))
});

router.post('/logout', (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }
  
  removeSession(token);
  
  res.json(success());
});

router.post('/register', async (req, res) => {
  const { name, inviteCode } = req.body;
  if (!name || !inviteCode) {
    return res.status(400).json({ error: 'Name and invite code are required' });
  }
  const user = await createUser(name, inviteCode);
  res.json(success(user))
})

export default router;
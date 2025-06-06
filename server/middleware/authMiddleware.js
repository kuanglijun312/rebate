import { getSession, removeSession } from '../auth/session.js';
export const createAuthenticate = (ingorePath) => (req, res, next) => {
  if (ingorePath.includes(req.path)) {
    return next();
  }
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token || !getSession(token)) {
    return res.status(401).json({ code: 401, message: '未授权' });
  }
  
  const session = getSession(token);
  
  if (session.expiresAt < Date.now()) {
    removeSession(token);
    return res.status(401).json({ code: 401, message: '会话已过期' });
  }
  
  req.session = session;
  next();
};

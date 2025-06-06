import { writeFileFromJsonContent, readFileContentForJson } from '../utils/file.js';
import { getRandomString } from '../utils/string.js'

const sessions = await readFileContentForJson('sessions.json', '{}')

export const createSession = (uid) => {
  const token = getRandomString(36);
  const session = {
    uid,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24小时
  };
  
  addSession(token, session);
  return { token, session };
};

export const addSession = (token, session) => {
  sessions[token] = session;
  writeFileFromJsonContent('sessions.json', sessions);
};

export const getSession = (token) => {
  return sessions[token];
};

export const removeSession = (token) => {
  delete sessions[token];
  writeFileFromJsonContent('sessions.json', sessions);
};
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import tradeRoutes from './routes/tradeRoutes.js';
import { createAuthenticate } from './middleware/authMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 3001;

const app = express();

// 登陆校验
const authorization  = createAuthenticate([
  '/api/user/login',
  '/api/user/register',
  '/api/user/logout',
])

app.use(errorMiddleware)
app.use(cors());
app.use(express.json());
app.use(authorization);

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/trade', tradeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
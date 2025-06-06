// server/routes/tradeRoutes.js
import { Router } from 'express';
import { getTradeOverview, getTradeList } from '../database/trade.js';
import { getUser, getUserList } from '../database/user.js';
import { success } from '../utils/response.js';

const router = Router();

router.get('/overview', async (req, res) => {
  const {
    userIds,
    trades,
  } = await getTradeOverview(req.session.uid);

  const user = await getUser(req.session.uid);
  const totalFee = trades.reduce((acc, trade) => acc + trade.fee, 0);
  const data = {
    invitedUserCount: userIds.length,
    tradeCount: trades.length,
    totalAmount: trades.reduce((acc, trade) => acc + trade.amount, 0),
    totalFee,
    totalRebate: totalFee * user.rate,
  }
  
  res.json(success(data));
});

router.get('/list', async (req, res) => {
  const { page = 1, pageSize = 10, searchContent } = req.query;
  
  const user = await getUser(req.session.uid);
  const { trades, paginatedTrades } = await getTradeList(req.session.uid, searchContent, page, pageSize);
  const relatedUserIds = Array.from(new Set(paginatedTrades.map(({ uid }) => String(uid))));
  const relatedUsers = await getUserList(relatedUserIds);
  const relatedUserMap = relatedUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  res.json(success({
    list: paginatedTrades.map(trade => ({
      ...trade,
      userName: relatedUserMap[trade.uid].name,
      rebate: trade.fee * user.rate,
    })),
    pagination: {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      total: trades.length
    }
  }));
});

export default router;
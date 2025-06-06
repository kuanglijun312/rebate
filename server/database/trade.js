import { readFileContentForJson } from "../utils/file.js"
import { getUserListByName } from "./user.js"
import { getRelatedUserIds } from "./userRelation.js"

export const getTradeOverview = async (uid) => {
  const relatedUserIds = await getRelatedUserIds(uid)
  const trades = await readFileContentForJson('trades.json')
  const relatedTrades = trades.filter(({ uid }) => relatedUserIds.includes(String(uid)))
  return {
    userIds: relatedUserIds,
    trades: relatedTrades,
  }
}

export const getTradeList = async (uid, searchContent, page, pageSize) => {
  let userIds = null
  if (searchContent) {
    const users = await getUserListByName(searchContent)
    userIds = users.map(user => String(user.id))
  }
  console.log(userIds,searchContent,  'userIds')
  const { trades } = await getTradeOverview(uid)
  const filteredTrades = userIds ? trades.filter(({ uid }) => userIds.includes(String(uid))) : trades
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const paginatedTrades = filteredTrades.slice(start, end)
  return {
    trades,
    paginatedTrades,
  }
}
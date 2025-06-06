import { requestGet } from "."

export const getOverviewData = async () => (
  requestGet('/api/trade/overview')
)

export const getTradeList = async (searchContent: string, page: number, pageSize: number) => (
  requestGet('/api/trade/list', { searchContent, page, pageSize })
)
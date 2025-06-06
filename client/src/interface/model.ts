
export interface ITradeItem {
  id: number
  uid: number
  userName: string
  amount: number
  fee: number
  rebate: number
  timestamp: number
}

export interface IUser {
  id: number
  name: string
  inviteCode: string
  rate: number
}

import type { Debt, Friend } from './types'

export const defaultFriend: Friend = {
  name: 'Friend 1',
  debts: [],
  id: Date.now()
}
export const defaultItem: Debt = {
  itemName: 'Item 1',
  price: 0,
  debt: 0,
  itemId: 0,
  includedFriends: []
}
// Friends
export type Friend = {
  name: string;
  debts: Debt[];
  id: number;
};

// Debts
export type Debt = {
  itemName: string | number;
  price: number | string;
  debt: number;
  itemId: number;
  includedFriends: number[];
};
export type UpdateDebtObj = {
  id: number;
  field?: 'itemName' | 'price';
  value?: string | number | undefined;
  debt?: number;
  includedFriends?: number[];
};
// Computed lists
export type SimplifiedDebt = {
  itemId: number;
  debt: number;
  itemName: string;
};
export type FriendWithDebt = {
  name: string;
  id: number;
  debts: SimplifiedDebt[];
};
export type FriendsMap = {
  [key: number]: FriendWithDebt;
};

// Friends
export type Friend = {
  name: string | undefined;
  debts: Debt[];
  id: number;
};

// Debts
export type Debt = {
  itemName: string | undefined;
  price: number;
  debt: number;
  itemId: number;
  includedFriends: number[];
};
export type UpdateDebtObj = {
  id: number;
  field?: string;
  value?: string | number | undefined;
  debt?: number;
  includedFriends?: number[];
};
// Computed lists
export type SimplifiedDebt = {
  itemId: number;
  debt: number;
  itemName: string | undefined;
};
export type FriendWithDebt = {
  name: string | undefined;
  id: number;
  debts: SimplifiedDebt[];
};
export type FriendsMap = {
  [key: number]: FriendWithDebt;
};

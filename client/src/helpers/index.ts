import { CartItem } from "../types"

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
}
import { CartItem as CartItemType } from "../types";

const CartItem = ({ title, price, quantity }: CartItemType) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  )
}

export default CartItem;

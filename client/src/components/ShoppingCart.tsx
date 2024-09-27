import CartItems from "./CartItems";
import { CartItem as CartItemType } from "../types";

interface ShoppingCartProps {
  cartItems: CartItemType[];
  onCheckout: () => void;
}

const ShoppingCart = ({ cartItems, onCheckout }: ShoppingCartProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
         <>
            <p>Your cart is empty</p>
            <p>Total: $0</p>
         </>
        ) : (
          <CartItems cartItems={cartItems} />
        )}
        <button className="checkout" disabled={cartItems.length === 0} onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </header>
  )
}

export default ShoppingCart;
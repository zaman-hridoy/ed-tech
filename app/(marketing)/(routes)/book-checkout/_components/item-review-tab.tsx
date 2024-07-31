"use client";

import CartItem from "../../cart/_components/cart-item";

interface Props {
  cartItems: any[];
}

const ItemReviewTab = ({ cartItems }: Props) => {
  return (
    <div className="space-y-6 py-4">
      {cartItems.map((cart: any) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </div>
  );
};

export default ItemReviewTab;

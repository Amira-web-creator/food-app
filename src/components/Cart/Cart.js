import React, { useContext, useState } from "react";
import CartContext from "../../store/Cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import ChecOut from "./CheckOut";

const Cart = (props) => {
  const [isCheckingOut, setisCheckingOut] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (theItem) => {
    cartCtx.addItem({ ...theItem, amount: 1 });
  };

  const orderHandler = () => {
    return setisCheckingOut(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onclose}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          order
        </button>
      )}
    </div>
  );

  return (
    <Modal onlose={props.onclose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && <ChecOut onCancel={props.onclose} />}
      {!isCheckingOut && modalActions}
    </Modal>
  );
};

export default Cart;

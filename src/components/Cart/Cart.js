import React, { useContext, useState } from "react";
import CartContext from "../../store/Cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import ChecOut from "./CheckOut";

const Cart = (props) => {
  const [isCheckingOut, setisCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setDidSubmitting] = useState(false);

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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      "https://foodapp-7b366-default-rtdb.firebaseio.com/orders.json",
      {
        method: "Post",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmitting(true);
    cartCtx.clearCart();
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

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <ChecOut onConfirm={submitOrderHandler} onCancel={props.onclose} />
      )}
      {!isCheckingOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data ...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>successfully sent the order</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onclose}>
        close
      </button>
     
    </div>
    </React.Fragment>
  );
  return (
    <Modal onlose={props.onclose}>
      {!isSubmitting && !didSubmitting && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

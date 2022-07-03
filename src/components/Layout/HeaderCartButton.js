import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsahighlighted, stbtnIsahighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsahighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    stbtnIsahighlighted(true);
    const timer = setTimeout(()=>{

      stbtnIsahighlighted(false)
    }, 300);

    return () => {

      clearTimeout(timer);

    };


  }, [items]);

  return (
    <button className={btnClasses} onClick={props.myonClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

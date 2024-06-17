import { FC, useEffect, useState } from "react";
import { ICartProduct } from "../../types/ProjectTypes";
import styles from "./CartBlock.module.css";
type CartBlockProps = {
  cart: ICartProduct[];
};

const CartBlock: FC<CartBlockProps> = (props) => {
  const { cart } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let tempTotalPrice = 0;

    cart.forEach((pr) => {
      tempTotalPrice = tempTotalPrice + pr.product.price * pr.quantity;
    });
    
    setTotalPrice(tempTotalPrice);
  }, [cart]);

  return (
    <div className={styles.wrapper}>
      {cart.map((pr) => (
        <p key={pr.product.id}>
          {pr.product.title} -- {pr.quantity} шт -- {(pr.quantity * pr.product.price).toFixed(2)} рублей
        </p>
      ))}
      {cart.length ? <p>Всего: {totalPrice} рублей</p> : <p>Еще ничего нет</p>}
    </div>
  );
};

export default CartBlock;

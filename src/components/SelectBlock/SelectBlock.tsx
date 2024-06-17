import React, { FC, useEffect, useState } from "react";
import { IProduct, ICartProduct } from "../../types/ProjectTypes";
import axios from "axios";
import styles from "./SelectBlock.module.css";

type SelectBlockProps = {
  setCart: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
  cart: ICartProduct[];
};
const SelectBlock: FC<SelectBlockProps> = (props) => {
  const { cart, setCart } = props;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [currentProductId, setCurrentProductId] = useState<number>(-1);

  useEffect(() => {
    axios.get("https://dev-su.eda1.ru/test_task/products.php")
      .then((res) => res.data)
      .then((data) => setProducts(data.products));
  }, []);

  const AddToCart = () => {
    const CartProductItem = products.find((el) => el.id == currentProductId);

    if (CartProductItem && quantity) {
      const currenProduct = cart.find((el) => el.product.id == currentProductId);

      if (currenProduct) {
        currenProduct.quantity = currenProduct.quantity + quantity;
        setCart([...cart]);
      } else {
        setCart([...cart, { product: CartProductItem, quantity }]);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <select
        value={currentProductId}
        onChange={(e) => setCurrentProductId(parseInt(e.target.value))}
      >
        <option value={-1} disabled>Выберите товар</option>
        
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.title} -- {product.price} рублей
          </option>
        ))}
        
      </select>
      <label htmlFor="count">Введите количество:</label>
      <input
        type="number"
        min={0}
        name="count"
        id="count"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={() => AddToCart()}>Добавить в корзину</button>
    </div>
  );
};

export default SelectBlock;

import { ICartProduct, OrderProduct } from "./types/ProjectTypes";
import { useRef, useState } from "react";
import SelectBlock from "./components/SelectBlock/SelectBlock";
import CartBlock from "./components/CartBlock/CartBlock";
import Modal from "./components/Modal/Modal";
import axios from "axios";

function App() {
  const [cart, setCart] = useState<ICartProduct[]>([]);
  const [open, setOpen] = useState(false);
  const number = useRef(0);

  const createOrderProduct = () => {
    if (!cart.length) return null;
    const orderProductList: OrderProduct[] = [];
    cart.forEach((element) =>
      orderProductList.push({
        product_id: element.product.id,
        quantity: element.quantity,
      })
    );
    return { products: orderProductList };
  };

  const save = () => {
    const orderCart = createOrderProduct();
    if (orderCart) {
      axios
        .post("https://dev-su.eda1.ru/test_task/save.php", orderCart)
        .then((res) => {
          if (res.status == 200) {
            setOpen(true);
            setCart([]);
            number.current = res.data.code;
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <SelectBlock cart={cart} setCart={setCart}></SelectBlock>
        <CartBlock cart={cart} />
      </div>
      <button disabled={!cart.length} onClick={() => save()}>
        Сохранить
      </button>
      <Modal number={number.current} close={() => setOpen(false)} open={open} />
    </>
  );
}

export default App;

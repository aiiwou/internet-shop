import { FC } from "react";
import styles from "./Modal.module.css";
import clsx from "clsx";
type ModalProps = {
  open: boolean;
  close: () => void;
  number: number;
};
const Modal: FC<ModalProps> = (props) => {
  const { open, close, number } = props;
  return (
    <div
      onClick={() => close()}
      className={clsx(styles.modal_container, open && styles.open)}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h1>УСПЕШНО</h1>
        <p>Ваш номер заказа: {number}</p>
      </div>
    </div>
  );
};

export default Modal;

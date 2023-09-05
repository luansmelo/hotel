import { Search } from "lucide-react";
import styles from "./styles.module.scss";
export default function InputSearchProduct() {
  return (
    <div className={styles.inputCointainer}>
      <Search size={24} color="#84A59D" />
      <input placeholder="Buscar o nome do produto" />
    </div>
  );
}

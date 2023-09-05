import { Settings } from "lucide-react";
import styles from "./styles.module.scss";

export default function InputList() {
  return (
    <div className={styles.inputListContainer}>
      <Settings width={'140px'} height={'140px'}/>
    </div>
  );
}

import { Settings } from "lucide-react";
import styles from "./styles.module.scss";

export default function Management() {
  return (
    <div className={styles.managementContainer}>
      <Settings width={'140px'} height={'140px'}/>
    </div>
  );
}

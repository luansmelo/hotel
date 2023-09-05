import { Plus } from "lucide-react";
import styles from "./styles.module.scss";
import { FEATURES, FeatureViewContext } from "@/contexts/FeaturesViewContext";
import { useContext } from "react";
interface AddButtonProps {
  text: string;
}
export default function AddButton({ text }: AddButtonProps) {
  const { onChangeFeatureView } = useContext(FeatureViewContext)
  
  return (
    <button className={styles.AddButtonContainer} onClick={() => onChangeFeatureView(FEATURES.CREATE_PRODUCT)}>
      <Plus color="#ffffff" />
      <p>{text}</p>
    </button>
  );
}

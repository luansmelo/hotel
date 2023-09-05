import { Apple, Microwave, Soup } from "lucide-react";
import MenuButton from "./button/MenuButton";
import styles from "./menu.module.css";
import Image from "next/image";
import { useContext } from "react";
import { FEATURES, FeatureViewContext } from "@/contexts/FeaturesViewContext";


export default function Menu() {
  const { onChangeFeatureView } = useContext(FeatureViewContext)

  return (
    <div className={styles.menuContainer}>
      <div className={styles.main}>
        <div className={styles.imageContainer}>
          <Image src={"/chef-hat.png"} alt="Logo" width={110} height={110} />
          <p>App</p>
          <hr />
        </div>
        <div className={styles.menuButtonContainer}>
          <MenuButton
            Icon={Microwave}
            text="Gerencia"
            active={false}
            onClickMenuButton={onChangeFeatureView}
            selectedFeature={FEATURES.MANAGEMENT}
          />
          <MenuButton
            Icon={Soup}
            text="Produtos"
            active={true}
            onClickMenuButton={onChangeFeatureView}
            selectedFeature={FEATURES.PRODUCT_LIST}
          />
          <MenuButton
            Icon={Apple}
            text="Insumos"
            active={true}
            onClickMenuButton={onChangeFeatureView}
            selectedFeature={FEATURES.INPUT_LIST}
          />
        </div>
      </div>
    </div>
  );
}

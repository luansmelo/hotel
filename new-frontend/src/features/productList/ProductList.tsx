import InputSearchProduct from "@/components/InputSearchProduct";
import styles from "./styles.module.scss";
import AddButton from "@/components/addButton";
import ProductListItem from "@/components/ProductListItem";
import { Pagination } from "@mui/material";

export default function ProductList() {
    
  return (
    <div className={styles.productListContainer}>
      <div className={styles.productListHeader}>
        <InputSearchProduct />
        <AddButton text="Adicionar Produto" />
      </div>
      <div className={styles.productListMainView}>
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
      </div>
      <div className={styles.productListFooter}>
        <Pagination shape="rounded" count={10} color="primary" />
      </div>
    </div>
  );
}

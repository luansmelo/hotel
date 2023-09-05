import { MenuItem, Select, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import TableDetails from "@/components/tableDetails";

const imageUrl =
  "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/15e659f813191093952844327b19623c.webp?itok=z4LHA1c7";

export default function ProductDetails() {
  return (
    <div className={styles.productDetailsContainer}>
      <h2 className={styles.productDetailsTitle}>Detalhe do Produto</h2>
      <div className={styles.productDetailsContent}>
        <div className={styles.productInfoContainer}>
          <div className={styles.sideLeft}>
            <div className={styles.imageWrapper}>
              <img
                src={imageUrl}
                alt="Uma foto de um prato de estrogonofe."
                height={400}
              />
            </div>
            <div className={styles.inputsWrapper}>
              <div className={styles.nameWrapper}>
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.priceWrapper}>
                <TextField
                  id="outlined-basic"
                  label="Preço Un"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.selectWrapper}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={10}
                  fullWidth
                >
                  <MenuItem value={10}>Variante X</MenuItem>
                  <MenuItem value={20}>Variante Y</MenuItem>
                  <MenuItem value={30}>Variante Z</MenuItem>
                </Select>
              </div>
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Descrição do Produto"
                multiline
                rows={4}
                defaultValue="Default Value"
                fullWidth
              />
            </div>
          </div>
          <div className={styles.sideRight}>
            <TextField
              id="outlined-multiline-static"
              label="Modo de Preparo"
              multiline
              rows={26}
              defaultValue="Escreva aqui uma descrição para seu produto..."
              fullWidth
              value=""
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <TableDetails />
        </div>
      </div>
    </div>
  );
}

import { FileUp } from 'lucide-react'
import styles from './styles.module.scss'
import { TextField } from '@mui/material'
import AddButton from '@/components/addButton'

export default function CreateProduct() {
  return (
    <div className={styles.createProductContainer}>
      <h2 className={styles.createProductTitle}>Criar novo prato</h2>

      <div className={styles.createProductContent}>
        <div className={styles.sideLeft}>
          <div className={styles.uploadFileContainer}>
            <FileUp color="#2196F3" />

            <span className={styles.textWrapper}>
              <input id="uploadFile" type="file" />
              <label htmlFor="uploadFile" className={styles.labelUploadFile}>
                Click to upload
              </label>
              <p>or drag and drop</p>
            </span>
            <p>SVG, PNG, JPG or GIF (max. 3MB)</p>
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="Insumo"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className={styles.sideRight}>
          <div className={styles.productInfoContainer}>
            <div className={styles.nameAndVariantWrapper}>
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                fullWidth
              />
            </div>

            <div className={styles.descriptionAndMethodWrapper}>
              <TextField
                id="outlined-multiline-static"
                label="Modo de Preparo"
                multiline
                rows={7}
                defaultValue="Escreva aqui uma descrição para seu produto..."
                fullWidth
                value=""
              />
            </div>
          </div>

          <div className={styles.createProduct}>
            <AddButton text="Criar Prato" />
          </div>
        </div>
      </div>
    </div>
  )
}

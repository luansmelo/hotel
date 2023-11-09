import InputSearchProduct from '@/components/InputSearchProduct'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import { useState } from 'react'
import { Fade } from '@mui/material'
import { useInputContext } from '@/context/InputContext'
import InputLine from '@/components/TableInputs/InputLine'

interface ITableInputsProps {
  hideHeader?: boolean
  hideTableHeader?: boolean
}

export default function Inputs({ hideHeader }: ITableInputsProps) {
  const [hasNewInput, setNewInput] = useState(false)

  const createInputtObj = {
    code: '',
    name: '',
    unitPrice: 0,
    measurementUnit: '',
    group: '',
    grammage: 0,
  }

  const { inputList } = useInputContext()

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.InputsContainer}>
        <div className={styles.InputBody}>
          {!hideHeader && (
            <div className={styles.buttonsWrapper}>
              <InputSearchProduct />
              <AddButton
                text="Criar Insumo"
                onClickButton={() => setNewInput(true)}
              />
            </div>
          )}

          {hasNewInput && (
            <Fade in={true} timeout={750}>
              <div className={styles.tableCreateContainer}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <td>Código</td>
                      <td>Nome</td>
                      <td>Preço Unitário</td>
                      <td>Unidade Medida</td>
                      <td>Grupo</td>
                      <td>Gramatura</td>
                    </tr>
                  </thead>

                  <tbody className={styles.tbody}>
                    <InputLine
                      key={createInputtObj.name}
                      input={createInputtObj}
                      isEnabledEditProps
                      isNewInputProps
                      handleCancelNewInput={() => setNewInput(false)}
                    />
                  </tbody>
                </table>
              </div>
            </Fade>
          )}

          {!hasNewInput && (
            <Fade in={true} timeout={750}>
              <div className={styles.tableCreateContainer}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <td>Código</td>
                      <td>Nome</td>
                      <td>Preço Unitário</td>
                      <td>Unidade Medida</td>
                      <td>Grupo</td>
                      <td>Gramatura</td>
                    </tr>
                  </thead>

                  <tbody className={styles.tbody}>
                    {inputList.map((input) => {
                      return <InputLine key={input.name} input={input} />
                    })}
                  </tbody>
                </table>
              </div>
            </Fade>
          )}
        </div>
      </div>
    </Fade>
  )
}

'use client'
import InputSearchProduct from '@/components/atoms/InputSearchProduct'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import { useContext, useState } from 'react'
import InputLine from '@/components/organisms/TableInputs/InputLine'
import { InputContext } from '@/context/InputContext'

interface InputProps {
  hideHeader?: boolean
  hideTableHeader?: boolean
}

export default function Input({ hideHeader }: InputProps) {
  const [hasInput, setInput] = useState(false)

  const { inputList } = useContext(InputContext)

  return (
    <>
      <div className={styles.InputsContainer}>
        <div className={styles.InputBody}>
          {!hideHeader && (
            <div className={styles.buttonsWrapper}>
              <InputSearchProduct />
              <AddButton
                text="Criar Insumo"
                onClickButton={() => setInput(true)}
              />
            </div>
          )}

          {hasInput && (
            // <Fade in={true} timeout={750}>
            <div className={styles.tableCreateContainer}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th>Nome</th>
                    <th>Unidade Medida</th>
                    <th>Preço Unitário</th>
                    <th>Código</th>
                    <th>Gramatura</th>
                    <th>Grupo</th>
                  </tr>
                </thead>

                <tbody className={styles.tbody}>
                  <InputLine
                    isEnabledEditProps
                    isNewInputProps
                    handleCancelNewInput={() => setInput(false)}
                  />
                </tbody>
              </table>
            </div>
            // </Fade>
          )}

          {!hasInput && (
            // < in={true} timeout={750}>
            <div className={styles.tableCreateContainer}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th>Nome</th>
                    <th>Unidade Medida</th>
                    <th>Preço Unitário</th>
                    <th>Código</th>
                    <th>Gramatura</th>
                    <th>Grupo</th>
                  </tr>
                </thead>

                <tbody className={styles.tbody}>
                  {inputList.map((input) => {
                    return <InputLine key={input.name} input={input} />
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

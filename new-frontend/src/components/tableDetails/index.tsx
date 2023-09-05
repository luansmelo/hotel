import styles from "./styles.module.scss";

export default function TableDetails() {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <td>Nome</td>
        <td>Quantidade</td>
        <td>Medida</td>
        <td>Preço Un</td>
      </thead>
      <tbody className={styles.tbody}>
        <tr className={styles.tr}>
          <td>Cebola</td>
          <td>1</td>
          <td>Un</td>
          <td>R$ 1,50</td>
        </tr>
        <tr className={styles.tr}>
          <td>Frango</td>
          <td>300</td>
          <td>G</td>
          <td>R$ 1,50</td>
        </tr>
        <tr className={styles.tr}>
          <td>Arroz</td>
          <td>500</td>
          <td>G</td>
          <td>R$ 1,50</td>
        </tr>
      </tbody>
    </table>
  );
}

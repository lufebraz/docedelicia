import { NavMenu } from "../../../components/NavBar";
import styles from './styles.module.scss';

export default function Pedido() {
  return (
    <main>
      <NavMenu />
      <div className={styles.container}>
        <h3>Cadastrar Pedido:</h3>
        <br />
        <div className={styles.div}>
          <h4>Cliente</h4>
          <label>Nome:</label>
          <input type="text" />
          <label>CPF: </label>
          <input type="text" />
        </div>
        <div className={styles.div}>
          <label>Produtos:</label>
          <input type="text" name="" id="" />
        </div>
      </div>
    </main>
  )
}
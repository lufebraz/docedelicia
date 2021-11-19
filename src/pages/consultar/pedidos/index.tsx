import { NavMenu1 } from "../../../components/NavBar";
import styles from '../fabricantes/list.module.scss';

export default function ConsultarPedidos() {
  return (
    <>
      <NavMenu1 />
      <div className={styles.div}>

        <h2>Pedidos:</h2>
      </div>
    </>
  )
}
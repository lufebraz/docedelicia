import { GetServerSideProps } from "next";
import { NavMenu1 } from "../../../components/NavBar";
import { heroku } from "../../../services/api";
import styles from './styles.module.scss';
import Link from 'next/link';

type Pedido = {
  id: number,
  status: string,
  valorTotal: number,
  dtPrevista: Date,
  cliente: {
    nome: string,
    tCelular: string,
    tFixo: string
  },
  itemPedido: [{ id: number }]
}
type HomeProps = {
  pedidos: Pedido[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('pedido/true')

  const pedidos = data.map(pedido => {
    return {
      id: pedido.id,
      status: pedido.status,
      cliente: pedido.cliente,
      valorTotal: pedido.valorTotal,
      dtPrevista: pedido.dtPrevista,
      itemPedido: pedido.itemPedido
    }
  })

  return {
    props: {
      pedidos
    }
  }
}

export default function ConsultarPedidos({ pedidos }: HomeProps) {
  const pedidosList = [...pedidos]
  return (
    <>
      <NavMenu1 />
      <div className={styles.div}>

        <h2>Lista de Pedidos:</h2>
        <div className={styles.lista}>
          {pedidosList.map(pedido => {
            return (
              <div key={pedido.id} className={styles.repo}>
                <div>        
                        
                  <strong className={ (pedido.status === "Pagamento confirmado")? styles.on : styles.off}>Status:  {pedido.status}</strong>
                  <strong>Nome Cliente: {pedido.cliente.nome}</strong>
                </div>
                <div>

                  <strong>Valor Total: {pedido.valorTotal}</strong>
                  <strong>Tel: {pedido.cliente.tCelular ? pedido.cliente.tCelular : pedido.cliente.tFixo}</strong>
                  <strong>data prevista: {pedido.dtPrevista}</strong>
                  {/* <strong>qnt de itens: {pedido.itemPedido?.length}</strong> */}
                  <Link href={`pedidos/${pedido.id}`}>👁️</Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
import { GetServerSideProps } from "next";
import { NavMenu1 } from "../../../components/NavBar";
import { heroku } from "../../../services/api";
import styles from './styles.module.scss';
import Link from 'next/link';
import VMasker from "vanilla-masker";

type Pedido = {
  id: number,
  status: string,
  valorTotal: number,
  dtPrevista: string,
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
        <div >
          <table className={styles.listagem}>
            <th>Status: </th>
            <th>Nome do Cliente:</th>
            <th>Valor Total:</th>
            <th>Telefone:</th>
            <th>Data prevista:</th>
            <th></th>
            {pedidosList.map(pedido => {
              return (
                <tr key={pedido.id} >
                  <td className={(pedido.status === "Pagamento confirmado") ? styles.on : styles.off}>{pedido.status}</td>
                  <td>{pedido.cliente.nome}</td>
                  <td>R$ {pedido.valorTotal}</td>
                  <td>{!!pedido.cliente.tCelular ? VMasker.toPattern(pedido.cliente.tCelular, "(99) 99999-9999") : VMasker.toPattern(pedido.cliente.tFixo, "(99) 9999-9999")}</td>
                  <td>{pedido.dtPrevista.substring(10, 8)+"/"+pedido.dtPrevista.substring(5, 7)+"/"+pedido.dtPrevista.substring(4, 0)}</td>
                  {/* <td>qnt de itens: {pedido.itemPedido?.length}</td> */}
                  <td><Link href={`pedidos/${pedido.id}`}>👁️</Link></td>
                </tr>
              )
            })}

          </table>

        </div>
      </div>
    </>
  )
}
import { GetServerSideProps } from "next"
import { heroku } from "../../../services/api";
import styles from './styles.module.scss'

type Pedido = {
  id: number,
  nome: string,
  status: string,
  cliente: {
    nome: string
  },
  itemPedido: [
    {
      id: number,
      nome: string,
      status: string
    }
  ]
}

type PedidoProps = {
  pedido: Pedido
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await heroku.get(`pedido/id/${slug}/true`)

  const pedido = {
    id: data.id,
    status: data.status,
    cliente: data.cliente,
    itemPedido: data.itemPedido
  }
  return {
    props: {
      pedido
    }
  }
}

export default function Pedido({ pedido }: PedidoProps) {
  return (
    <main className={styles.container}>
      <h1>Pedido nº: {pedido.id}</h1>
      <div>
        {console.log(pedido)}
        <label>Nome do Cliente: </label>
        <input type="text" defaultValue={pedido.cliente.nome} />

        <label>Status do pedido: </label>
        <select name="" id="" defaultValue={pedido.status}>
          <option value="">-</option>
          <option value="string">String</option>
          <option value="Aguardado pagamento">Aguardando Pagamento</option>
          <option value="Pagamento confirmado">Pagamento confirmado</option>
        </select>
        <table>
          <tr>
            <th>nome:</th>
            <th>status:</th>
          </tr>
          {
            pedido.itemPedido.map(e => {
              <tr key={e.id}>
                <td>{e.nome}</td>
                <td>{e.status}</td>
              </tr>
            })
          }
        </table>
      </div>
    </main>
  )
}
import axios from "axios";
import { GetServerSideProps } from "next"
import Router from 'next/router'
import { useState } from "react";
import { heroku } from "../../../services/api";
import styles from './styles.module.scss'

type Pedido = {
  id: number,
  nome: string,
  status: string,
  cliente: {
    nome: string
  },
  itemPedido: item[],
  clienteId: string,
  enderecoId: string
}
type item = {

  id: number,
  nome: string,
  observacao: string,
  quantidade: number,
  produto: {
    descricao: string,
    nome: string
  }

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
    clienteId: data.clienteId,
    enderecoId: data.enderecoId,
    itemPedido: data.itemPedido
  }
  return {
    props: {
      pedido
    }
  }
}

export default function Pedido({ pedido }: PedidoProps) {
  const [status, setStatus] = useState(pedido.status)
  function voltar(){
    Router.push(`./`)
  }
  function salvar(){
    axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/pedido/id/${pedido.id}`,
      data: {
        status: status,
        enderecoId: pedido.enderecoId,
        clienteId: pedido.clienteId
      }
    }).then(function (response) {
      if (response.status === 200) {
        alert('Pedido atualizado!!');
        Router.push(`./`)
      }
    })
      .catch(function (response) {
        alert('Pedido não atualizado!');
      });
  
  }
  return (
    <main className={styles.container}>
      <h1>Pedido nº: {pedido.id}</h1>
      <div >
        <div className={styles.conteudo}>
          <label>Nome do Cliente: {pedido.cliente.nome}</label>

          <div>

          <label>Status do pedido: </label>
          <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-</option>
            <option value="Aguardando pagamento">Aguardando Pagamento</option>
            <option value="Pagamento confirmado">Pagamento confirmado</option>
            <option value="Em produção">Em produção</option>
            <option value="Pronto para entrega">Pronto para entrega</option>
            <option value="Saiu para entrega">Saiu para entrega</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          </div>

        </div>

        <table className={styles.listagem}>
          <tr>
            <th>Nome do produto:</th>
            <th>
              Quantidade:</th>
            <th>Descricao: </th>
            <th>Observação:</th>
          </tr>
         {console.log(pedido.itemPedido)} 
          {
            pedido.itemPedido.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.produto.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.produto.descricao ? item.produto.descricao : "-"}</td>
                  <td>{item.observacao ? item.observacao : "-"}</td>

                </tr>
              )
            })
          }
        </table>
      </div>
      <button onClick={() => voltar()}>Voltar</button>
      <button onClick={() => salvar()}>Salvar</button>
    </main>
  )
}
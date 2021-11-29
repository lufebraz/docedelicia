import axios from "axios";
import { GetServerSideProps } from "next"
import Router from 'next/router'
import { useState } from "react";
import VMasker from "vanilla-masker";
import { heroku } from "../../../services/api";
import styles from './styles.module.scss'

type Pedido = {
  id: number,
  nome: string,
  status: string,
  valorTotal: number,
  valorPago: string,
  dtPrevista: string,
  dtEntrega: string,
  dtCompra: string,
  cliente: {
    nome: string
  },
  endereco: {
    nome: string,
    cep: string,
    logradouro: string,
    numero: string,
    bairro: string
    cidade: string
    estado: string
  }
  itemPedido: item[],
  clienteId: string,
  enderecoId: string
}
type item = {

  id: number,
  nome: string,
  observacao: string,
  quantidade: number,
  valorUnitario:string,
  produto: {
    descricao: string,
    nome: string,
    tipoUnidade:string
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
    valorTotal: data.valorTotal,
    valorPago: data.valorPago,
    dtPrevista: data.dtPrevista,
    dtEntrega: data.dtEntrega,
    dtCompra: data.dtCompra,
    itemPedido: data.itemPedido,
    endereco: data.endereco
  }
  return {
    props: {
      pedido
    }
  }
}

export default function Pedido({ pedido }: PedidoProps) {
  const [status, setStatus] = useState(pedido.status)
  const [valorPago, setValorPago] = useState(pedido.valorPago)
  function voltar() {
    Router.push(`./`)
  }
  function salvar() {
    axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/pedido/id/${pedido.id}`,
      data: {
        status: status,
        enderecoId: pedido.enderecoId,
        clienteId: pedido.clienteId,
        valorTotal: pedido.valorTotal,
        valorPago: parseFloat(valorPago),
        dtPrevista: pedido.dtPrevista,
        dtEntrega: pedido.dtEntrega,
        dtCompra: pedido.dtCompra,
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
        <div>
          <h3>Endereço para entrega:</h3>
          <p> 
            { pedido.endereco.nome + " - " +
            pedido.endereco.logradouro + ", " + pedido.endereco.numero +
            " - " + pedido.endereco.bairro + ", " + pedido.endereco.cidade +
            "-" + pedido.endereco.estado +
            ". cep: " + VMasker.toPattern(pedido.endereco.cep, "99999-999")} </p>
        </div>
        <div>
          <h4>Valor total: {pedido.valorTotal}</h4>
          <h4 >Data da compra: {pedido.dtCompra.substring(10, 8) + "/" + pedido.dtCompra.substring(5, 7) + "/" + pedido.dtCompra.substring(4, 0)}</h4>
          <h4 >Data prevista para entrega: {pedido.dtPrevista.substring(10, 8) + "/" + pedido.dtPrevista.substring(5, 7) + "/" + pedido.dtPrevista.substring(4, 0)}</h4>
          {
            pedido.status === "Entregue" ? <h4 >Data para entrega: {pedido.dtEntrega.substring(10, 8) + "/" + pedido.dtEntrega.substring(5, 7) + "/" + pedido.dtEntrega.substring(4, 0)}</h4> : ""
          }

        </div>
        <br />

        <table className={styles.listagem}>
          <tr>
            <th>Nome do produto:</th>
            <th>Quantidade:</th>
            <th>Valor:</th>
            <th>Descricao: </th>
            <th>Observação:</th>
          </tr>
          {console.log(pedido.itemPedido)}
          {
            pedido.itemPedido.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.produto.nome}</td>
                  <td>{"  " + item.quantidade +" "+ item.produto.tipoUnidade }</td>
                  <td>{(item.quantidade* parseFloat(item.valorUnitario)).toFixed(2)}</td>
                  <td>{item.produto.descricao ? item.produto.descricao : "-"}</td>
                  <td>{item.observacao ? item.observacao : "-"}</td>
                </tr>
              )
            })
          }
        </table>
        <br />
        <label >valor pago:</label><br />
        <input type="text" value={valorPago} onChange={(e) => setValorPago(e.target.value)} />
      </div>
      <button onClick={() => voltar()}>Voltar</button>
      <button onClick={() => salvar()}>Salvar</button>
    </main>
  )
}
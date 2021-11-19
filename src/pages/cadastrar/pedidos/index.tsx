import axios from "axios";
import { useState } from "react";
import { NavMenu } from "../../../components/NavBar";
import styles from './styles.module.scss';

type Clientes = {
  cliente: {
    id: number;
    nome: string;
    email: string;
    tCelular: string;
    cpf: string;
    endereco: [
      {
        nome: string;
        cep: string;
        estado: string;
        cidade: string;
        bairro: string;
        logradouro: string;
        numero: number;
        complemento: string;
        referencia: string;
        ativo: number;
      }
    ]
  }
}

type Produtos = {
  produto: {
    id: number;
    nome: string,
    preco: number,
    descricao: string,
    tipoUnidade: string,
    categoria: string,
  }
}

type Pedido = {
  dtPrevista: string;
  desconto: string;
  valorTotal: number;
  clienteId: number;
  enderecoId: 0;
  valorPago: string;
  status: string;
  itemPedido: [
    {
      valorUnitario: string;
      quantidade: number;
      observacao: string;
      idProduto: number;
      status: string;
      recheioItemPedido: [
        {
          idRecheio: string;
        }
      ]
      formatoItemPedido: [
        {
          idFormato: string;
        }
      ]
    }
  ]
}

type ListaProdutos = {

}


export default function Pedido() {

  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [clientes, setClientes] = useState<Clientes>({} as Clientes)
  const [produtos, setProdutos] = useState<Produtos>({} as Produtos)
  //const [listaProdutos, setListaProdutos] = useState<ListaProdutos>({} as ListaProdutos)
  const [tipoUnidade, setTipoUnidade] = useState('')
  async function buscarCliente() {
    await fetch(`https://docedelicia.herokuapp.com/api/cliente/nome/${nomeCliente}/true`)
      .then(response => response.json())
      .then(data => listaClientes(data))
      .catch(function (error) { alert('não encontrado') })
  }

  function listaClientes(data) {
    if (data.length == 0) {
      alert('Nenhum cliente encontrado')
    } else if (data.length > 1) {
      alert('Seja mais específco')
    } else {
      setClientes(data)
    }
  }

  async function buscarProdutos() {
    await fetch(`https://docedelicia.herokuapp.com/api/produto/nome/${nomeProduto}/true`)
      .then(response => response.json())
      .then(data => listaProdutos(data))
      .catch(function (error) { alert('não encontrado') })
  }
  function listaProdutos(data) {
    if (data.length == 0) {
      alert('Nenhum produto encontrado')
    } else if (data.length > 1) {
      alert('Seja mais específco')
    } else {
      setProdutos(data)
      setTipoUnidade(data[0].tipoUnidade)
    }
  }

  return (
    <main>
      <NavMenu />
      <div className={styles.container}>
        <h3>Cadastrar Pedido:</h3>
        <br />
        <div className={styles.div} >
          <h4>Cliente</h4>
          <hr />
          <label>buscar cliente:</label>
          <input type="text" value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} />
          <button onClick={buscarCliente} type="button">🔍</button>
          <label>Nome:</label>
          <input type="text" value={clientes[0]?.nome} />
          <label>CPF: </label>
          <input type="text" value={clientes[0]?.cpf} />
        </div>
        <div className={styles.div}>
          <h4>Produtos</h4>
          <hr />
          <label>buscar produtos:</label>
          <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
          <button onClick={buscarProdutos} > 🔍</button>

          <label >nome:</label>
          <input type="text" value={produtos[0]?.nome} />
          <label>descrição:</label>
          <input type="text" value={produtos[0]?.descricao} />

          <label>quantidade em {tipoUnidade}: </label>
          <input type="text" />
          <button>adicionar!</button>
        </div>
        <div className={styles.div}>
          <label htmlFor="">Pedido:</label>

        </div>
      </div>
    </main>
  )
}
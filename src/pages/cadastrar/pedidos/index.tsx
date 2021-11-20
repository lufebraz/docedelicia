import axios from "axios";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { NavMenu } from "../../../components/NavBar";
import styles from './styles.module.scss';
import stylesLista from '../../../components/Modal/styles.module.scss'
import { parse } from "path";

type Cliente = {

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

type Produto = {

  id: number;
  nome: string,
  preco: number,
  descricao: string,
  tipoUnidade: string,
  categoria: string,
  quantidade: string,
}

type Pedido = {
  dtPrevista: string;
  desconto: string;
  valorTotal: number;
  clienteId: number;
  enderecoId: 0;
  valorPago: string;
  status: string;
  itemPedido: itemPedido[]
}
type itemPedido = {

  nome: string;
  idProduto: number;
  valorUnitario: string;
  quantidade: string;
  observacao: string;
  preco: number;
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

export default function Pedido() {
  const [listagemCliente, setListagemCliente] = useState(true)

  const [dataCliente, setDataCliente] = useState<Cliente[]>([])
  const [dataProduto, setDataProduto] = useState<Produto[]>([])


  const [show, setShow] = useState(false)
  const [header, setHeader] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [cliente, setCliente] = useState<Cliente>({} as Cliente)
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const [tipoUnidade, setTipoUnidade] = useState('')
  const [quantidade, setQuantidade] = useState('1')

  const [compra, setCompra] = useState<itemPedido>({} as itemPedido)
  const [listaPedidos, setlistaPedidos] = useState<itemPedido[]>([])


  async function buscarCliente() {
    await fetch(`https://docedelicia.herokuapp.com/api/cliente/nome/${nomeCliente}/true`)
      .then(response => response.json())
      .then(data => listaClientes(data))
      .catch(function (error) { alert('não encontrado') })
  }
  async function buscarProdutos() {
    await fetch(`https://docedelicia.herokuapp.com/api/produto/nome/${nomeProduto}/true`)
      .then(response => response.json())
      .then(data => listaProdutos(data))
      .catch(function (error) { alert('não encontrado') })
  }

  function listaClientes(data) {
    if (data.length == 0) {
      alert('Nenhum cliente encontrado')
    } else if (data.length > 1) {
      setShow(true)
      setListagemCliente(true)
      setDataCliente(data)
      setHeader("Clientes encontrados: ")
    } else {
      setCliente(data[0])
    }
  }

  function listaProdutos(data) {
    if (data.length == 0) {
      alert('Nenhum produto encontrado')
    } else if (data.length > 1) {
      setShow(true)
      setListagemCliente(false)
      setDataProduto(data)
      setHeader("Produtos encontrados: ")
    } else {
      setProduto(data[0])
      setTipoUnidade(data[0].tipoUnidade)
    }
  }

  function closeModal() {
    setShow(false)
  }

  function setData(props) {
    if (listagemCliente) {
      setCliente(dataCliente.find(e => e.id == props))
    } else {
      setProduto(dataProduto.find(e => e.id == props))
      setTipoUnidade(produto.tipoUnidade)
    }
  }

  function adicionarCarrinho() {
    if (produto.id != undefined) {
      compra.idProduto = produto.id
      compra.nome = produto.nome
      compra.quantidade = parseInt(quantidade) < 1 ? '1' : quantidade
      compra.preco = produto.preco
      
      setlistaPedidos([...listaPedidos, compra])

      setCompra({} as itemPedido)
    }
  }

  return (
    <main>
      <Modal header={header} show={show} clicked={() => closeModal()}
        data={listagemCliente ? dataCliente : dataProduto}
        tipoListagem={listagemCliente} setData={(e) => setData(e)} />

      <NavMenu />
      <div>

      </div>
      <div className={styles.container}>
        <h3>Cadastrar Pedido:</h3>
        <br />
        <div className={styles.main}>


          <div className={styles.div} >
            <h4>Cliente</h4>
            <hr />
            <label>buscar cliente:</label>
            <div>
              <input type="text" value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} />
              <button onClick={buscarCliente} type="button" className={styles.lupa}>🔍</button>
            </div>
            <label>Nome:</label>
            <input type="text" value={cliente.nome} />
            <label>CPF: </label>
            <input type="text" value={cliente.cpf} />
          </div>
          <div className={styles.div}>
            <h4>Produtos</h4>
            <hr />
            <label>buscar produtos:</label>
            <div>
              <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
              <button onClick={buscarProdutos} className={styles.lupa}> 🔍</button>
            </div>

            <label >nome:</label>
            <input type="hidden" value={produto.id} />
            <input type="text" value={produto.nome} />
            <label>descrição:</label>
            <input type="text" value={produto.descricao} />

            <label>quantidade em {tipoUnidade}: </label>
            <input type="number" min={1} value={quantidade} onChange={e => setQuantidade(e.target.value)} />


            <button className={styles.adicionar} onClick={adicionarCarrinho}>adicionar!</button>
          </div>
        </div>
        <div className={styles.div}>
          <label htmlFor="">Pedido:</label>
          {
            listaPedidos.map(item => {
              return (

                <div key={item.idProduto} className={stylesLista.lista}>
                  <p>nome: {item.nome}</p>
                  <p> quantidade: {item.quantidade}</p>
                  <p> valor: {parseInt(item.quantidade) * item.preco}</p>
                </div>
              )

            })
          }
        </div>
      </div>
    </main>
  )
}
import axios from "axios";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { NavMenu } from "../../../components/NavBar";
import styles from './styles.module.scss';
import { SyncLoader } from "react-spinners";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import  Router  from "next/router";

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
  quantidade: number;
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
  
  const { register, handleSubmit } = useForm<Cliente>();
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
  const [listaPedidos, setListaPedidos] = useState<itemPedido[]>([])

  const [loading, setLoading] = useState(false);


  function enviar() {
    setLoading(true);
    console.log(cliente.id)
    var pedido : Pedido = ({} as Pedido);
    pedido.clienteId = cliente.id;
    pedido.itemPedido = listaPedidos
    console.log(pedido)
    // await axios({
    //   method: 'POST',
    //   url: 'https://docedelicia.herokuapp.com/api/cliente',
    //   headers: { 'Cliente': 'dados do cliente' },
    //   data: values
    // })
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       alert('Cliente cadastrado!!');
    //       Router.push(`/consultar/clientes`)
    //     }
    //   })
    //   .catch(function (response) {
    //     console.log(response.data)
    //     console.log(response.message)
    //     console.log(response.status)
    //     console.log(response)
    //     alert('Cliente não cadastrado! Verificar campos' + response);
    //   });
    setLoading(false)
  }

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

      if (listaPedidos.find(e => e.idProduto == produto.id)) {
        console.log("entrou")

        var lista: any = []

        listaPedidos.forEach((e) => {
          if (e.idProduto == produto.id) {
            e.quantidade += parseInt(quantidade);
          }
          lista.push(e)
        })

        setListaPedidos(lista)
      } else {

        compra.idProduto = produto.id
        compra.nome = produto.nome
        compra.quantidade = parseInt(quantidade) < 1 ? 1 : parseInt(quantidade)
        compra.preco = produto.preco

        setListaPedidos([...listaPedidos, compra])

        setCompra({} as itemPedido)
      }
    }
  }

  function removerProduto(id) {
    setListaPedidos(listaPedidos.filter(element => element.idProduto != id))
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

                <div key={item.idProduto} className={styles.lista}>
                  <p> - {item.nome}</p>
                  <p> quantidade: {item.quantidade}</p>
                  <p> valor: {(item.quantidade * item.preco).toFixed(2)}</p>
                  <p onClick={() => removerProduto(item.idProduto)}>❌</p>
                </div>
              )

            })
          }
          <div className={styles.buttons}>
              {loading ? <SyncLoader color="#4979FF" size="11" /> :
                <>
                  <button type="button" onClick={enviar} >Salvar</button>
                  <Link href="/"><button>Cancelar</button></Link>
                </>
              }
            </div>
        </div>

      </div>
    </main>
  )
}
import axios from "axios";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { NavMenu } from "../../../components/NavBar";
import styles from './styles.module.scss';
import { SyncLoader } from "react-spinners";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import Router from "next/router";

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
  produtoRecheio: [
    {
      idRecheio: string;
      recheio: {
        nome: string
      }
    }
  ]
  produtoFormato: [
    {
      idFormato: string;
      formato: {
        nome: string
      }
    }
  ]
}

type Pedido = {
  dtPrevista: string;
  clienteId: number;
  enderecoId: number; // so se for entrega
  valorPago: number;
  itemPedido: itemPedido[]
}
type itemPedido = {

  nome: string;
  idProduto: number;
  quantidade: number;
  observacao: string;
  preco: number;
  valorUnitario: number;
  recheioItemPedido: [
    {
      idRecheio: string;
      recheio: {
        nome: string
      }
    }
  ]
  formatoItemPedido: [
    {
      idFormato: string;
      formato: {
        nome: string
      }
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
  const [listaPedidos, setListaPedidos] = useState<itemPedido[]>([])

  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState('')
  const [date, setDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())

  const [valorPago, setValorPago] = useState('')


  function enviar() {
    setLoading(true);
    var pedido: Pedido = ({} as Pedido);
    pedido.clienteId = cliente.id;
    pedido.itemPedido = listaPedidos
    pedido.dtPrevista = date + 'T' + time
    pedido.valorPago = parseFloat(valorPago)
    pedido.enderecoId = 1
    
  
    console.log(JSON.stringify(pedido))

    axios({
      method: 'POST',
      url: 'https://docedelicia.herokuapp.com/api/pedido',
      headers: { 'pedido': 'dados do pedido' },
      data: pedido
    })
      .then(function (response) {
        if (response.status === 200) {
          alert('pedido cadastrado!!');
          Router.push(`/consultar/pedidos`)
        }
      })
      .catch(function (response) {
        console.log(response.data)
        console.log(response.message)
        console.log(response.status)
        console.log(response)
        alert('pedido não cadastrado! Verificar campos' + response);
      });
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
            e.quantidade += parseFloat(quantidade);
          }
          lista.push(e)
        })

        setListaPedidos(lista)
      } else {

        compra.idProduto = produto.id
        compra.nome = produto.nome
        compra.quantidade = parseFloat(quantidade) < 1 ? 1 : parseFloat(quantidade)
        compra.preco = produto.preco
        compra.formatoItemPedido = produto.produtoFormato
        compra.recheioItemPedido = produto.produtoRecheio
        compra.valorUnitario = 0

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
          <label htmlFor="">Pedido:  </label>
          {
            listaPedidos.map(item => {
              return (

                <div key={item.idProduto} className={styles.lista}>
                  <p> - {item.nome}</p>
                  <p> quantidade: {item.quantidade}</p>
                  <p> valor: {(item.quantidade * item.preco).toFixed(2)}</p>
                  {item.recheioItemPedido.length > 0 ?
                    <div>
                      <label >recheio: </label>
                      <select>
                        {
                          item.recheioItemPedido.map((formato, index) => {
                            return (
                              <option value={item.recheioItemPedido[index].idRecheio}>{item.recheioItemPedido[index].recheio.nome}</option>
                            )
                          })
                        }

                      </select>
                    </div>
                    : <p>-</p>
                  }
                  {item.formatoItemPedido.length > 0 ?
                    <div>
                      <label >formato: </label>
                      <select>
                        {
                          item.formatoItemPedido.map((formato, index) => {
                            return (
                              <option value={item.formatoItemPedido[index].idFormato}>{item.formatoItemPedido[index].formato.nome}</option>
                            )
                          })
                        }

                      </select>
                    </div>
                    : <p>-</p>
                  }
                  <p onClick={() => removerProduto(item.idProduto)}>❌</p>
                </div>
              )

            })
          }
          <label >data prevista para entrega</label>
          <input type="date" min={date} value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          <label >valor pago</label>
          <input type="number" value={valorPago} onChange={e => setValorPago(e.target.value)} />
          <br />
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
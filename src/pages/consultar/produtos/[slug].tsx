import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './slug.module.scss';
import Router from 'next/router'
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import Link from 'next/link';
import SyncLoader from 'react-spinners/SyncLoader';
import { useState } from 'react';


type Produto = {
  id: number,
  nome: string,
  descricao: string,
  tipoUnidade: string,
  categoria: string,
  fabricanteId: number,
  fabricante: string,
  preco: number,
  ativo: number,
  produtoRecheio: { idRecheio: number }[],
  produtoFormato: { idFormato: number }[],
}

type Recheios = {
  nome: string;
  id: number;
}
type Formatos = {
  nome: string;
  id: number;
}
type Fabricantes = {
  id: number,
  nome: string,
}

type HomeProps = {
  produto: Produto;
  fabricante: Fabricantes[];
  formatos: Formatos[];
  recheios: Recheios[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await heroku.get(`produto/${slug}`)

  const produto = {
    id: data.id,
    nome: data.nome,
    descricao: data.descricao,
    tipoUnidade: data.tipoUnidade,
    categoria: data.categoria,
    preco: data.preco,
    ativo: data.ativo,
    fabricante: data.fabricante.nome,
    fabricanteId: data.fabricanteId,
    produtoFormato: data.produtoFormato,
    produtoRecheio: data.produtoRecheio,
  }

  const res = await fetch(`https://docedelicia.herokuapp.com/api/fabricante/ativos`)
  const data1 = await res.json()

  const fabricante = data1.map(fabricante => {
    return {
      id: fabricante.id,
      nome: fabricante.nome
    }
  });

  const res1 = await fetch(`https://docedelicia.herokuapp.com/api/formato/ativos`)
  const data2 = await res1.json()
  const formatos = data2.map(formato => {
    return {
      id: formato.id,
      nome: formato.nome
    }
  });

  const res2 = await fetch(`https://docedelicia.herokuapp.com/api/recheio/ativos`)
  const data3 = await res2.json()
  const recheios = data3.map(recheio => {
    return {
      id: recheio.id,
      nome: recheio.nome
    }
  });

  return {
    props: {
      formatos,
      recheios,
      produto,
      fabricante
    },
  }
}

export default function Produtos({ produto, fabricante, formatos, recheios }: HomeProps) {
  const fabricanteList = [...fabricante];
  const formatosList = [...formatos]
  const recheiosList = [...recheios]

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Produto>();
  const onSubmit = handleSubmit(async (values) => {
    setLoading(true)
    values.produtoRecheio = 
    values.produtoRecheio.filter(i => {
      if(!!i.idRecheio) return i.idRecheio
    })
    values.produtoFormato = 
    values.produtoFormato.filter(i => {
      if(!!i.idFormato) return i.idFormato
    })
    await axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/produto/${produto.id}`,
      data: values
    }).then(function (response) {
      if (response.status === 200) {
        alert('Produto atualizado!!');
        Router.push(`./`)
      }
    })
      .catch(function (response) {
        alert('Produto não atualizado!');
      });

    setLoading(false)
  })


  return (

    <main >
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>

          <h3>Dados do Produto:</h3>

          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Nome do produto: </label>
              <input type="text" defaultValue={produto?.nome} required {...register('nome')} />
            </div>
            <div className={styles.formitem}>

              <label >Tipo de unidade: </label>
              <select name="unidade" {...register('tipoUnidade')} required defaultValue={produto?.tipoUnidade}>
                <option value="">-</option>
                <option value="un">Unidade</option>
                <option value="kg">Kg</option>
                <option value="g">Gramas</option>
                <option value="l">Litro</option>
                <option value="ml">ML</option>
              </select>
            </div>
            <div className={styles.formitem}>
              <label >Preço:</label>
              <input type="number" min="0.00" max="10000.00" step="0.01" required {...register('preco')} defaultValue={produto?.preco} className={styles.input} />
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Descrição:</label>
              <input type="text" {...register('descricao')} defaultValue={produto?.descricao} />
            </div>
            <div className={styles.formitem}>

              <label >Categoria: </label>
              <select name="categoria" {...register('categoria')} required defaultValue={produto?.categoria}>
                <option value="">-</option>
                <option value="bolos">Bolos</option>
                <option value="salgados">Salgados</option>
                <option value="tortas">Tortas</option>
                <option value="bebidas">Bebidas</option>
                <option value="doces">Doces</option>
                <option value="topo">Topo</option>
                <option value="sobremesas">Sobremesas</option>
              </select>
            </div>
            <div className={styles.formitem}>
              <label >Produto ativo?</label>
              <select name="ativo" {...register('ativo')} defaultValue={produto?.ativo} required >
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>
              <label >Recheios:</label>
              {recheiosList.map((recheios, i) => {
                return (

                  <div key={recheios.id} className={styles.spaceBtw}>
                    <input value={recheios.id} type="checkbox" {...register(`produtoRecheio.${i}.idRecheio`)}
                      defaultChecked={
                        !!produto.produtoRecheio.find(e => e.idRecheio === recheios.id)
                      } ></input>
                    <label > {recheios.nome}</label>
                  </div>
                )
              })}
            </div>

            <div className={styles.formitem}>
              <label >Formatos: </label>
              {formatosList.map((formatos, i) => {
                return (
                  <div key={formatos.id} className={styles.spaceBtw}>
                    <input value={formatos.id} type="checkbox" {...register(`produtoFormato.${i}.idFormato`)}
                    defaultChecked={
                      !!produto.produtoFormato.find(e => e.idFormato === formatos.id)
                    } ></input>
                    <label > {formatos.nome}</label>
                  </div>
                )
              })}

            </div>
          </div>
          <label >Fabricante: </label>

          <select name="fabricanteId" {...register('fabricanteId')} defaultValue={produto.fabricanteId}>
            {fabricanteList.map(fabricantes => {
              return (<option key={fabricantes.id} value={fabricantes.id}>{fabricantes.nome}</option>)
            })}
          </select>
          <div className={styles.formgroup}>
            {
              loading ? <SyncLoader color="#4979FF" size="11" /> :
                <>
                  <button type="submit">Atualizar</button>
                  <Link href="./"><button >Voltar</button></Link>
                </>
            }

          </div>
        </form>

      </div>
    </main>
  )
}






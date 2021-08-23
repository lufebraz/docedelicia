import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavMenu } from '../../../components/NavBar';
import styles from './styles.module.scss';
import Router from 'next/router'
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import Link from 'next/link';
import { useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

type Produto = {
  nome: string,
  descricao: string,
  tipoUnidade: string,
  categoria: string,
  preco: number,
  ativo: number
  fabricanteId: string,
  produtoRecheio: { idRecheio: number }[],
  produtoFormato: { idFormato: number }[],
}

type Fabricantes = {
  nome: string;
  id: number;
}
type Recheios = {
  nome: string;
  id: number;
}
type Formatos = {
  nome: string;
  id: number;
}
type HomeProps = {
  formatos: Formatos[];
  recheios: Recheios[];
  fabricantes: Fabricantes[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('fabricante/ativos', {
    params: {
      _sort: 'nome',
      _order: 'asc',
    }
  });
  const fabricantes = data.map(fabricante => {
    return {
      nome: fabricante.nome,
      id: fabricante.id,
    }
  });

  const res = await fetch(`https://docedelicia.herokuapp.com/api/recheio/ativos`)
  const data1 = await res.json()
  const recheios = data1.map(recheio => {
    return {
      id: recheio.id,
      nome: recheio.nome
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

  return {
    props: {
      formatos,
      recheios,
      fabricantes
    }
  }
}

export default function Produtos({ fabricantes, formatos, recheios }: HomeProps) {
  const fabricantesList = [...fabricantes]
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
      method: 'POST',
      url: 'https://docedelicia.herokuapp.com/api/produto',
      headers: { 'Produto': 'dados do produto' },
      data: values
    }).then(function (response) {
      if (response.status === 200) {
        alert('Produto cadastrado!!');
        Router.push(`/consultar/produtos/`)
      }
    })
      .catch(function (response) {
        alert('Produto não cadastrado!');
      });
    setLoading(false)
  })


  return (

    <main >
      <NavMenu />
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
          <input type="hidden" value="1" {...register('ativo')} readOnly />
          <h3>Dados do Produto:</h3>

          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Nome do produto: </label>
              <input type="text" required {...register('nome')} />
            </div>
            <div className={styles.formitem}>

              <label >Tipo de unidade: </label>
              <select name="unidade" {...register('tipoUnidade')} required>
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
              <input type="number" min="0.00" max="10000.00" step="0.01" required {...register('preco')} className={styles.input} />
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Descrição:</label>
              <input type="text" {...register('descricao')} />
            </div>
            <div className={styles.formitem}>

              <label >Categoria: </label>
              <select name="categoria" {...register('categoria')} required>
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
          </div>
          <div className={styles.formgroup}>

            <div className={styles.formitem}>
              <label >Recheios:</label>
              {recheiosList.map((recheios, i) => {                
                return (
                  <div key={recheios.id} className={styles.spaceBtw}>
                    <input value={recheios.id} type="checkbox" {...register(`produtoRecheio.${i}.idRecheio` as const)} ></input>
                    <label > {recheios.nome}</label>
                  </div>
                )
              })}
            </div>

            <div className={styles.formitem}>
              <label >Formatos: </label>
              {formatosList.map((formatos , i) => {
                return (
                  <div key={formatos.id} className={styles.spaceBtw}>
                    <input value={formatos.id} type="checkbox" {...register(`produtoFormato.${i}.idFormato` as const)}></input>
                    <label > {formatos.nome}</label>
                  </div>
                )
              })}

            </div>

          </div>
          <label >Fabricante: </label>
          <select name="fabricanteId" {...register('fabricanteId')} required>
            <option value="">-</option>
            {fabricantesList.map(fabricantes => {
              return (<option key={fabricantes.id} value={fabricantes.id}>{fabricantes.nome}</option>)
            })}
          </select>
          <div className={styles.formgroup}>
            {loading ? <SyncLoader color="#4979FF" size="11" /> :
              <>
                <input type="submit" value="Cadastrar" className={styles.button} />
                <button className={styles.button}><Link href="/">Cancelar</Link></button>
              </>
            }
          </div>
        </form>

      </div>
    </main>
  )
}


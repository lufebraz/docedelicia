import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavMenu } from '../../../../components/NavBar';
import styles from '../../../cadastrar/produtos/styles.module.scss';
import Router from 'next/router'
import {  GetStaticPaths, GetStaticProps } from 'next';
import { api1 } from '../../../../services/api';
import Link from 'next/link';

type Produto = {
  id:number,
  nome: string,
  descricao: string,
  recheio: string,
  tipoUnidade: string,
  categoria: string,
  formato: string,
  fabricante: string,
  preco: number,
  ativo: number
}
type ProdutoProps = {
  produto: Produto;
}

export default function Produtos({ produto }: ProdutoProps) {

  const { register, handleSubmit } = useForm<Produto>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'PUT',
      url: `http://docedelicia.ignorelist.com:8080/api/produto/${produto.id}`,
      data: values
    })
    Router.push(`/relatorios/produtos/produtos`)
  })


  return (

    <main >
      <NavMenu />
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
                <option value="unitario">Unitário</option>
                <option value="kilo">Kg</option>
                <option value="grama">Gramas</option>
                <option value="litro">Litro</option>
                <option value="mililitro">ML</option>
              </select>
            </div>
            <div className={styles.formitem}>
              <label >Preço:</label>
              <input type="number" min="0.00" max="10000.00" step="0.01" required {...register('preco')} defaultValue={produto?.preco} />
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Descrição:</label>
              <input type="text" {...register('descricao')} defaultValue={produto?.descricao}/>
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
              <label >Ativo:</label>
              <select name="ativo" {...register('ativo')} defaultValue={produto?.ativo} required >
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Recheio:</label>
              <input type="text" {...register('recheio')} defaultValue={produto?.recheio}/>
            </div>

            <div className={styles.formitem}>

              <label >Formato: </label>
              <select name="formato" {...register('formato')} defaultValue={produto?.formato}>
                <option value="">-</option>
                <option value="redondo">Redondo</option>
                <option value="retangular">Retangular</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>

          </div>
          <label >Fabricante: </label>
          <select name="fabricante" {...register('fabricante')}  defaultValue={produto?.fabricante}>
            <option value="">-</option>
            
          </select>
          <div className={styles.formgroup}>

            <input type="submit" value="Salvar" className={styles.button} />

            <button className={styles.button}><Link href="../produtos">Voltar</Link></button>
          </div>
        </form>

      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api1.get(`/produto/${slug}`)

  const produto = {
    id: data.id,
    nome: data.nome,
    descricao: data.descricao,
    tipoUnidade: data.tipoUnidade,
    categoria: data.categoria,
    formato: data.formato,
    recheio:data.recheio,
    preco: data.preco,
    ativo: data.ativo
  }

  return {
    props: {
      produto
    },
  }
}



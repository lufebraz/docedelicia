import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './slug.module.scss';
import Router from 'next/router'
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import Link from 'next/link';

type Produto = {
  id: number,
  nome: string,
  descricao: string,
  recheio: string,
  tipoUnidade: string,
  categoria: string,
  formato: string,
  fabricanteId: number,
  fabricante: string,
  preco: number,
  ativo: number,
}

type Fabricantes = {
  id: number,
  nome: string,
}

type HomeProps = {
  produto: Produto;
  fabricante: Fabricantes[];
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
    formato: data.formato,
    recheio: data.recheio,
    preco: data.preco,
    ativo: data.ativo,
    fabricante: data.fabricante.nome,
    fabricanteId: data.fabricanteId
  }

  const res = await fetch(`https://docedelicia.herokuapp.com/api/fabricante/ativos`)
  const data1 = await res.json()

  const fabricante = data1.map(fabricante => {
    return {
      id: fabricante.id,
      nome: fabricante.nome
    }
  });


  return {
    props: {
      produto,
      fabricante
    },
  }
}

export default function Produtos({ produto, fabricante }: HomeProps) {
  const fabricanteList = [...fabricante];

  const { register, handleSubmit } = useForm<Produto>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/produto/${produto.id}`,
      data: values
    })
    Router.push(`./`)
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
                <option value="kilo">Kg</option>
                <option value="grama">Gramas</option>
                <option value="litro">Litro</option>
                <option value="mililitro">ML</option>
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

              <label >Recheio:</label>
              <input type="text" {...register('recheio')} defaultValue={produto?.recheio} />
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

          <select name="fabricanteId" {...register('fabricanteId')} defaultValue={produto.fabricanteId}>
            {fabricanteList.map(fabricantes => {
              return (<option key={fabricantes.id} value={fabricantes.id}>{fabricantes.nome}</option>)
            })}
          </select>
          <div className={styles.formgroup}>
            <Link href="./"><button >Voltar</button></Link>
            <button type="submit">Atualizar</button>
          </div>
        </form>

      </div>
    </main>
  )
}





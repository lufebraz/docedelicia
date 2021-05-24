import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavMenu } from '../../../components/NavBar';
import styles from './styles.module.scss';
import Router from 'next/router'
import { GetStaticProps } from 'next';
import { api1 } from '../../../services/api';
import { RepositoryFabricantePedido } from '../../../utils/RepositoryFabricantePedido';
import Link from 'next/link';

interface Fabricantes {
  nomeFabricante: string;
  id: number;
}
type HomeProps = {
  fabricantes: Fabricantes[];
}

type Produto = {
  nomeProduto: string,
  descricao: string,
  recheio: string,
  tipoUnidade: string,
  categoria: string,
  formato: string,
  fabricante: string
}

export default function Produtos({ fabricantes }: HomeProps) {
  const fabricantesList = [...fabricantes]

  const { register, handleSubmit } = useForm<Produto>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3333/produtos',
      headers: { 'Produto': 'dados do produto' },
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
              <input type="text" required {...register('nomeProduto')} />
            </div>
            <div className={styles.formitem}>

              <label >Tipo de unidade: </label>
              <select name="unidade" {...register('tipoUnidade')}>
                <option value="">-</option>
                <option value="unitario">Unitário</option>
                <option value="kilo">Kg</option>
                <option value="grama">Gramas</option>
                <option value="litro">Litro</option>
                <option value="mililitro">ML</option>
              </select>
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Descrição:</label>
              <input type="text" {...register('descricao')} />
            </div>
            <div className={styles.formitem}>

              <label >Categoria: </label>
              <select name="categoria" {...register('categoria')}>
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

              <label >Recheio:</label>
              <input type="text" {...register('recheio')} />
            </div>

            <div className={styles.formitem}>

              <label >Formato: </label>
              <select name="formato" {...register('formato')}>
                <option value="">-</option>
                <option value="redondo">Redondo</option>
                <option value="retangular">Retangular</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>

          </div>
          <label >Fabricante: </label>
          <select name="fabricante" {...register('fabricante')}>
            <option value="">-</option>
            {fabricantesList.map(fabricantes => {
              return (<RepositoryFabricantePedido key={fabricantes.id} fabricante={fabricantes} />
              )
            })}
          </select>
          <div className={styles.formgroup}>

            <input type="submit" value="Cadastrar" className={styles.button} />

            <button className={styles.button}><Link href="/">Cancelar</Link></button>
          </div>
        </form>

      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api1.get('fabricantes', {
    params: {
      _sort: 'nomeFabricante',
      _order: 'asc',
    }
  })

  const fabricantes = data.map(fabricantes => {
    return {
      nomeFabricante: fabricantes.nomeFabricante,
      id: fabricantes.id,
    }
  });

  return {
    props: {
      fabricantes
    }
  }
}
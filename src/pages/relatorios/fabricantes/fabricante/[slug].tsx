import styles from './styles.module.scss';
import { api } from '../../../../services/api';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

type Fabricante = {
  id: number,
  nomeFabricante: string,
}
type FabricanteProps = {
  fabricante: Fabricante;
}
export default function Fabricante({ fabricante }: FabricanteProps) {
  const { register, handleSubmit } = useForm<Fabricante>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'PUT',
      url: `http://localhost:3333/fabricantes/${fabricante.id}`,
      headers: { 'Fabricante': 'dados do fabricante' },
      data: values
    })
    Router.push(`/relatorios/fabricantes/fabricantes`)
  })
  return (
    <main >
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>

          <h3>Fabricante</h3>
          <label >Nome do Fabricante: </label>
          <input type="text" defaultValue={fabricante.nomeFabricante} required {...register('nomeFabricante')} />
          <label >Fabricante Ativo?</label>
          <select name="ativo" id="">
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          <div>
            <input type="submit" value="Atualizar" className={styles.button} />
            <button className={styles.button} type="button"><Link href={`../fabricantes`}>Voltar</Link></button>
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

  const { data } = await api.get(`/fabricantes/${slug}`)

  const fabricante = {
    id: data.id,
    nomeFabricante: data.nomeFabricante,
  }

  return {
    props: {
      fabricante
    },
  }
}
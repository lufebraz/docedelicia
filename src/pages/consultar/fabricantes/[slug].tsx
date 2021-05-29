import styles from './slug.module.scss';
import { heroku } from '../../../services/api';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router'
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Fabricante = {
  id: number,
  nome: string,
  ativo: number,
}
type FabricanteProps = {
  fabricante: Fabricante;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await heroku.get(`fabricante/${slug}`)

  const fabricante = {
    id: data.id,
    nome: data.nome,
    ativo: data.ativo,
  }

  return {
    props: {
      fabricante
    },
  }
}

export default function Fabricante({ fabricante }: FabricanteProps) {
  const { register, handleSubmit } = useForm<Fabricante>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/fabricante/${fabricante.id}`,
      headers: { 'Fabricante': 'dados do fabricante' },
      data: values
    })
    Router.push(`./`)
  })
  return (
    <main >
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>

          <h3>Fabricante</h3>
          <label >Nome do Fabricante: </label>
          <input type="text" defaultValue={fabricante.nome} required {...register('nome')} />
          <label >Fabricante Ativo?</label>
          <select name="ativo" id="" defaultValue={fabricante.ativo}{...register('ativo')} >
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
          <div>
            <Link href="./"><button >Voltar</button></Link>
            <button type="submit">Atualizar</button>
          </div>
        </form>

      </div>
    </main>
  )
}

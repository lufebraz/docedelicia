import styles from '../../fabricantes/fabricante/styles.module.scss';
import { heroku } from '../../../../services/api';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router'
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Fornecedor = {
  id: number,
  nome: string,
  ativo: number,
}
type FornecedorProps = {
  fornecedor: Fornecedor;
}
export default function Fornecedor({ fornecedor }: FornecedorProps) {
  const { register, handleSubmit } = useForm<Fornecedor>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'PUT',
      url: `http://localhost:3333/fornecedores/${fornecedor.id}`,
      headers: { 'Fornecedor': 'dados do fornecedor' },
      data: values
    })
    Router.push(`/relatorios/fornecedores/fornecedores`)
  })
  return (
    <main >
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>

          <h3>Fornecedor</h3>
          <label >Nome do Fornecedor: </label>
          <input type="text" defaultValue={fornecedor.nome} required {...register('nome')} />
          <label >Fornecedor Ativo?</label>
          <select name="ativo" id="" defaultValue={fornecedor.ativo}{...register('ativo')} >
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
          <div>
            <input type="submit" value="Atualizar" className={styles.button} />
            <button className={styles.button} type="button"><Link href={`../fornecedores`}>Voltar</Link></button>
          </div>
        </form>

      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await heroku.get(`/fornecedores/${slug}`)

  const fornecedor = {
    id: data.id,
    nome: data.nome,
    ativo: data.ativo,
  }

  return {
    props: {
      fornecedor
    },
  }
}
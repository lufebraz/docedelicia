import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavMenu } from '../../../components/NavBar';
import styles from './styles.module.scss';
import Router from 'next/router'
import Fabricante from './fabricante';

type Fornecedor = {
  nomeFornecedor: string,
  ativo: number,
}

export default function Fornecedores() {
  const { register, handleSubmit } = useForm<Fornecedor>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3333/fornecedores',
      headers: { 'Fornecedor': 'dados do fornecedor' },
      data: values
    })
    Router.push(`/relatorios/fornecedores/fornecedores`)
  })


  return (
    <main >
      <NavMenu />
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>

          <h3>Dados do Fornecedor:</h3>
          <label >Nome: </label>
          <input type="number" value="1"  {...register('ativo')} className={styles.hidden}/>
          <input type="text" required {...register('nomeFornecedor')} />
          <input type="submit" value="Cadastrar" className={styles.button} />

        </form>
        <hr />
        <Fabricante />
      </div>
    </main>
  )
}
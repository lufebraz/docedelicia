import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Router from 'next/router'
import styles from './styles.module.scss';

type Fabricante = {
  nome: string,
  ativo: number,
}

export default function Fabricante() {
  const { register, handleSubmit } = useForm<Fabricante>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'POST',
      url: 'https://docedelicia.herokuapp.com/api/fabricante',
      headers: { 'Fabricante': 'dados do Fabricante' },
      data: values
    })
    Router.push(`/consultar/fabricantes`)
  })


  return (

    <form onSubmit={onSubmit} className={styles.form}>

      <h3>Dados do Fabricante:</h3>
      <label >Nome: </label>
      <input type="text" required {...register('nome')} />
      <input type="hidden" value="1"  {...register('ativo')} readOnly/>

      <div>
        <input type="submit" value="Cadastrar" className={styles.button} />
        <button className={styles.button} type="button"><Link href="/">Cancelar</Link></button>
      </div>

    </form>
  )
}
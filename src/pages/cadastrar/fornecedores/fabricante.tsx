import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Router from 'next/router'
import styles from './styles.module.scss';

type Fabricante = {
  nomeFabricante: string,
  ativo: number,
}

export default function Fabricante() {
  const { register, handleSubmit } = useForm<Fabricante>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3333/fabricantes',
      headers: { 'Fabricante': 'dados do Fabricante' },
      data: values
    })
    Router.push(`/relatorios/fabricantes/fabricantes`)
  })


  return (

    <form onSubmit={onSubmit} className={styles.form}>

      <h3>Dados do Fabricante:</h3>
      <label >Nome: </label>
      <input type="text" required {...register('nomeFabricante')} />
      <input type="number" value="1"  {...register('ativo')} className={styles.hidden}/>

      <div>
        <input type="submit" value="Cadastrar" className={styles.button} />
        <button className={styles.button} type="button"><Link href="/">Cancelar</Link></button>

      </div>

    </form>



  )
}
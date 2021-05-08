import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

type Fabricante = {
  nomeFabricante: string,
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
    // Router.push(`/relatorios/fornecedores/fornecedores`)
  })


  return (

    <form onSubmit={onSubmit} className={styles.form}>

      <h3>Dados do Fabricante:</h3>
      <label >Nome: </label>
      <input type="text" required {...register('nomeFabricante')} />
      <div>
        <input type="submit" value="cadastrar" className={styles.button} />
        <button className={styles.button} type="button"><Link href="/">Cancelar</Link></button>

      </div>

    </form>



  )
}
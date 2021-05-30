import styles from './list.module.scss';
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';
import Link from 'next/link'

type Fabricantes = {
  id: number,
  nome: string,
  ativo: number,
}
type HomeProps = {
  fabricantes: Fabricantes[];
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('fabricante')

  const fabricantes = data.map(fabricantes => {
    return {
      nome: fabricantes.nome,
      id: fabricantes.id,
      ativo: fabricantes.ativo,
    }
  });

  return {
    props: {
      fabricantes
    }
  }
}

export default function ConsultarCliente({ fabricantes }: HomeProps) {
  const fabricantesList = [...fabricantes]

  return (
    <>
      <NavMenu1 />
      <div>
        <div className={styles.div}>
          <h3>Lista de Fabricantes:</h3>
          <br />
          <div className={styles.lista}>
            <ul>
              {fabricantesList.map(fabricantes => {
                return (
                  <div key={fabricantes.id} className={styles.repo}>
                    <strong>{fabricantes.nome}</strong>
                    <strong className={fabricantes.ativo == 1 ? styles.on : styles.off}>{fabricantes.ativo == 1 ? '✅' : '🚫'}</strong>
                    <Link href={`fabricantes/${fabricantes.id}`}>🔍</Link>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}


import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
import { raspberry } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';
import Link from 'next/link'

interface Fabricantes {
  nome: string;
  id: number;
}
type HomeProps = {
  fabricantes: Fabricantes[];
}
export default function ConsultarCliente({ fabricantes }: HomeProps) {
  const fabricantesList = [...fabricantes]

  return (
    <>
      <NavMenu1/>
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
                <Link href={`fabricante/${fabricantes.id}`}>Visualizar</Link>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await raspberry.get('fabricante')

  const fabricantes = data.map(fabricantes => {
    return {
      nome: fabricantes.nome,
      id: fabricantes.id,
    }
  });

  return {
    props: {
      fabricantes
    }
  }
}
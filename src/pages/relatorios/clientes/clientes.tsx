import styles from './styles.module.scss';
import { RepositoryClient } from '../../../utils/RepositoryClient';
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';
import Link from 'next/link';

type Clientes = {
  id: number,
  nome: string,
  tCelular: string,
  ativo: number,
}
type HomeProps = {
  clientes: Clientes[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('cliente')

  const clientes = data.map(clientes => {
    return {
      nome: clientes.nome,
      tCelular: clientes.tCelular,
      id: clientes.id,
      ativo: clientes.ativo
    }
  });

  return {
    props: {
      clientes
    }
  }
}

export default function ConsultarCliente({ clientes }: HomeProps) {
  const clientesList = [...clientes]

  return (
    <>
      <NavMenu1 />
      <div className={styles.div}>
                
        <h3>Lista de Clientes:</h3>

        <div className={styles.lista}>
          <ul>
          {clientesList.map(clientes => {
              return (
              <div key={clientes.id} className={styles.repo}>
                <strong>{clientes.nome}</strong>
                <strong>{clientes.tCelular}</strong>
                <strong>{clientes.ativo==1? 'ativo' : 'desativado'}</strong>
                <Link href={`cliente/${clientes.id}`}>Visualizar</Link>
              </div>
              )
            })}
          </ul>
        </div>
        
      </div>
    </>

  )
}

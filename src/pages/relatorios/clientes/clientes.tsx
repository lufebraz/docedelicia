import styles from './styles.module.scss';
import { RepositoryClient } from '../../../utils/RepositoryClient';
import { GetServerSideProps } from 'next';
import { raspberry } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';

interface Clientes {
  nome: string;
  tCelular: string;
  id: number;
}
type HomeProps = {
  clientes: Clientes[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await raspberry.get('cliente')

  const clientes = data.map(clientes => {
    return {
      nome: clientes.nome,
      tCelular: clientes.tCelular,
      id: clientes.id,
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
              return (<RepositoryClient key={clientes.id} pessoa={clientes} />)
            })}
          </ul>
        </div>
        
      </div>
    </>

  )
}

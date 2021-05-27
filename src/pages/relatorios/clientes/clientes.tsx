import styles from './styles.module.scss';
import { RepositoryClient } from '../../../utils/RepositoryClient';
import { GetServerSideProps } from 'next';
import { api1 } from '../../../services/api';


interface Clientes {
  nome: string;
  tCelular: string;
  id: number;
}
type HomeProps = {
  clients: Clientes[];
}
export default function ConsultarCliente({ clients }: HomeProps) {
  const clientesList = [...clients]

  return (

    <div className={styles.div}>
      {/* <div className={styles.buscarcliente}>
          <label>Buscar Cliente:</label> <br />
          <input name="nome" placeholder="Jose da Silva" ></input>
          
        </div>
        <hr /> */}

      <h3>Lista de Clientes:</h3>

      <div className={styles.lista}>
        <ul>
          {clientesList.map(clientes => {
            return (<RepositoryClient key={clientes.id} pessoa={clientes} />)
          })}
        </ul>
      </div>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api1.get('cliente', {
    params: {
      _sort: 'nome',
      _order: 'asc',
    }
  })

  const clients = data.map(clients => {
    return {
      nome: clients.nome,
      tCelular: clients.tCelular,
      id: clients.id,
    }
  });

  return {
    props: {
      clients
    }
  }
}
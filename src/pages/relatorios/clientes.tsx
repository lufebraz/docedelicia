import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { RepositoryClient } from '../../utils/RepositoryClient';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';


interface Clientes {
  nomeCliente: string;
  tcelular: string;
  id: number;
}
type HomeProps = {
  clients: Clientes[];
}
export default function ConsultarCliente({ clients }: HomeProps) {
  const clientesList = [...clients]

  return (
    <div>

      <div className={styles.div}>
        <div className={styles.buscarcliente}>
          <label>Buscar Cliente:</label> <br />
          <input name="nomeCliente" placeholder="Jose da Silva" ></input>
          <div>
            <strong>joaozinho</strong>
            <div>
              <p>telefone: 61999872372</p>
              <Link href={`/`}>Visualizar</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.lista}>
          <h3>Lista de Clientes:</h3>

          <ul>
            {clientesList.map(clientes => {
              return (<RepositoryClient key={clientes.id} pessoa={clientes} />)
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}


export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('clients')

  const clients = data.map(clients => {
    return {
      nomeCliente: clients.nomeCliente,
      tcelular: clients.tcelular,
      id: clients.id,
    }
  })

  return {
    props: {
      clients
    }
  }
}
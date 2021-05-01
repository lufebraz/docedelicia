import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { RepositoryClient } from '../../utils/RepositoryClient';
import Link from 'next/link';


interface Clientes {
  nomeCliente: string;
  tcelular: string;
  id: number;
}

export default function ConsultarCliente() {
  const [clientes, setClientes] = useState<Clientes[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/clients')
      .then(response => response.json())
      .then(data => setClientes(data))
  }, []);

  const [buscaCliente, setBuscaCliente ] = useState('')

  // useEffect(() => {
    
  //   fetch(`https://localhost:3333/clients/${buscaCliente}/`)
  //     .then(response => response.json())
  //     .then(data => setBuscaCliente(data))
  // }, [buscaCliente]);

  return (
    <div>

      <div className={styles.div}>
        <div className={styles.buscarcliente}>
          <label>Buscar Cliente:</label> <br />
          <input name="nomeCliente" placeholder="Jose da Silva" onChange={e => setBuscaCliente(e.target.value)}></input>
          <div>
            <strong>{buscaCliente}</strong>
            <div>
              <p>telefone: 61999872372</p>
              <Link href="">Visualizar</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.lista}>
          <h3>Lista de Clientes:</h3>

          <ul>
            {clientes.map(clientes => {
              return (<RepositoryClient key={clientes.id} pessoa={clientes} />)
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}

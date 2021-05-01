import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { RepositoryClient } from '../../utils/RepositoryClient';
import Link from 'next/link';
import { NavMenu } from '../../components/NavBar';

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


  return (
    <div>

      <div className={styles.div}>
        <div className={styles.buscarcliente}>
          <label>Buscar Cliente:</label> <br />
          <input name="nomeCliente" placeholder="Jose da Silva" ></input>
          <div>
            <strong>nome buscado</strong>
            <div>
              <p>telefone: 61999872372</p>
              <Link href="">Visualizar</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="clients-list">
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

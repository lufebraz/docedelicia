import styles from './styles.module.scss';
import Link from 'next/link';

export function Header() {
  return (

    <header className={styles.headerContainer}>
      <div>

        <div >
          <img src="/logo.svg" alt="Doce Delicia" />
        </div>

        <div className="menu">

          <ul>

            <li><Link href="/">Home</Link></li>
            <li><Link href={`/cadastrar/cliente`}>Cadastrar</Link>
              <ul>
                <li><Link href={`/cadastrar/cliente`}>Clientes</Link></li>
                <li><Link href={`/cadastrar/cliente`}>Pedidos</Link></li>
                <li><Link href={`/cadastrar/cliente`}>Produtos</Link></li>
                <li><Link href={`/cadastrar/cliente`}>Entregador</Link></li>
              </ul>
            </li>
            <li><Link href={`/relatorios/clientes`}>Consultar</Link>
              <ul>
                <li><Link href={`/cadastrar/cliente`}>Clientes</Link></li>
                <li><Link href={`/cadastrar/cliente`}>Pedidos</Link></li>
                <li><Link href={`/cadastrar/cliente`}>Produtos</Link></li>
                <li><Link href={`/cadastrar/cliente`}>Entregador</Link></li>
              </ul>
            </li>

          </ul>


        </div>
      </div>

    </header>


  )
}
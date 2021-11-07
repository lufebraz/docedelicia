import styles from './styles.module.scss';
import Link from 'next/link';
import Head from 'next/head'

export function Header() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>Doce Delicia | Confeitaria Artesanal</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      </Head>
      <header className={styles.headerContainer}>
        <div>

          <div >
            <a href="/"><img src="/logo.svg" alt="Doce Delicia" /></a>
          </div>

          <div >

            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href={`/cadastrar/clientes/`}>Cadastrar</Link>
                <ul>
                  <li><Link href={`/cadastrar/pedidos/`}>Pedidos</Link></li>
                  <li><Link href={`/cadastrar/clientes/`}>Clientes</Link></li>
                  <li><Link href={`/cadastrar/produtos/`}>Produtos</Link></li>
                  <li><Link href={`/cadastrar/fornecedores/`}>Fabricantes</Link></li>
                  {/* <li><Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link></li> */}
                  {/* <li><Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link></li> */}

                </ul>
              </li>
              <li><Link href={`/consultar/clientes/`}>Consultar</Link>
                <ul>
                  <li><Link href={`/consultar/pedidos/`}>Pedidos</Link></li>
                  <li><Link href={`/consultar/clientes`}>Clientes</Link></li>
                  <li><Link href={`/consultar/produtos`}>Produtos</Link></li>
                  {/* <li><Link href={`/consultar/fornecedores/fornecedores`}>Fornecedores</Link></li> */}
                  <li><Link href={`/consultar/fabricantes`}>Fabricantes</Link></li>
                  {/* <li><Link href={`/consultar/entregadores/entregadores`}>Entregador</Link></li> */}
                  {/* <li><Link href={`/consultar/funcionarios/funcionarios`}>Funcionário</Link></li> */}
                </ul>
              </li>
            </ul>

          </div>
        </div>

      </header>


    </>
  )
}
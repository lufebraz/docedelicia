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
            <li><Link href={`/cadastrar/clientes/cliente`}>Cadastrar</Link>
              <ul>
                <li><Link href={`/cadastrar/clientes/cliente`}>Clientes</Link></li>
                <li><Link href={`/cadastrar/pedidos/pedido`}>Pedidos</Link></li>
                <li><Link href={`/cadastrar/produtos/produto`}>Produtos</Link></li>
                <li><Link href={`/cadastrar/fornecedores/fornecedor`}>Fornecedores</Link></li>
                <li><Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link></li>
                <li><Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link></li>

              </ul>
            </li>
            <li><Link href={`/relatorios/clientes/clientes`}>Consultar</Link>
              <ul>
              <li><Link href={`/relatorios/clientes/clientes`}>Clientes</Link></li>
                <li><Link href={`/relatorios/pedidos/pedidos`}>Pedidos</Link></li>
                <li><Link href={`/relatorios/produtos/produtos`}>Produtos</Link></li>
                <li><Link href={`/relatorios/fornecedores/fornecedores`}>Fornecedores</Link></li>
                <li><Link href={`/relatorios/fabricantes/fabricantes`}>Fabricantes</Link></li>
                <li><Link href={`/relatorios/entregadores/entregadores`}>Entregador</Link></li>
                <li><Link href={`/relatorios/funcionarios/funcionarios`}>Funcionário</Link></li>
              </ul>
            </li>

          </ul>


        </div>
      </div>

    </header>


  )
}
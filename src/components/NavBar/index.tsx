import Link from 'next/link';
import styles from './styles.module.scss';

export function NavMenu() {
  return (
      <div className={styles.div}>

        <Link href={`/cadastrar/clientes/`}>Cliente</Link>
        {/* <Link href={`/cadastrar/pedidos/pedido`}>Pedido</Link> */}
        <Link href={`/cadastrar/produtos/`}>Produto</Link>
        <Link href={`/cadastrar/fornecedores/`}>Fabricantes</Link>
        {/* <Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link> */}
        {/* <Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link> */}
        
      </div>

  );
}
export function NavMenu1() {
  return (
      <div className={styles.div}>

        <Link href={`/relatorios/clientes/`}>Clientes</Link>
        {/* <Link href={`/cadastrar/pedidos/pedido`}>Pedido</Link> */}
        <Link href={`/relatorios/produtos/`}>Produtos</Link>
        <Link href={`/relatorios/fabricantes/`}>Fabricantes</Link>
        {/* <Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link> */}
        {/* <Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link> */}
        
      </div>

  );
}

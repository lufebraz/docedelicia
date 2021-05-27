import Link from 'next/link';
import styles from './styles.module.scss';

export function NavMenu() {
  return (
      <div className={styles.div}>

        <Link href={`/cadastrar/clientes/cliente`}>Cliente</Link>
        {/* <Link href={`/cadastrar/pedidos/pedido`}>Pedido</Link> */}
        <Link href={`/cadastrar/produtos/produtos`}>Produto</Link>
        <Link href={`/cadastrar/fornecedores/fornecedor`}>Fornecedores</Link>
        {/* <Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link> */}
        {/* <Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link> */}
        
      </div>

  );
}
export function NavMenu1() {
  return (
      <div className={styles.div}>

        <Link href={`/relatorios/clientes/clientes`}>Cliente</Link>
        {/* <Link href={`/cadastrar/pedidos/pedido`}>Pedido</Link> */}
        <Link href={`/relatorios/produtos/produtos`}>Produto</Link>
        <Link href={`/relatorios/fabricantes/fabricantes`}>Fabricantes</Link>
        {/* <Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link> */}
        {/* <Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link> */}
        
      </div>

  );
}

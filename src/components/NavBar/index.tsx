import Link from 'next/link';
import styles from './styles.module.scss';

export function NavMenu() {
  return (
      <div className={styles.div}>

        <Link href={`/cadastrar/clientes/cliente`}>Cliente</Link>
        <Link href={`/cadastrar/pedidos/pedido`}>Pedido</Link>
        <Link href={`/cadastrar/produtos/produto`}>Produto</Link>
        <Link href={`/cadastrar/fornecedores/fornecedor`}>Fornecedores</Link>
        <Link href={`/cadastrar/entregadores/entregador`}>Entregador</Link>
        <Link href={`/cadastrar/funcionarios/funcionario`}>Funcionário</Link>
        
      </div>

  );
}
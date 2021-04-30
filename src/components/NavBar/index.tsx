import Link from 'next/link';
import styles from './styles.module.scss';

export function NavMenu() {
  return (
      <div className={styles.div}>

        <Link href={`/cadastrar/cliente`}>Cliente</Link>
        <Link href={`/cadastrar/cliente`}>Pedido</Link>
        <Link href={`/cadastrar/cliente`}>Produto</Link>
        <Link href={`/cadastrar/cliente`}>Entregador</Link>
        <Link href={`/cadastrar/cliente`}>Funcionário</Link>
        
      </div>

  );
}
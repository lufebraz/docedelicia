import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  produtos: {
    nome: string;
    id: number;
  }
}

export function RepositoryProduto(props: RepositoryClientProps) {
  const id = props.produtos.id;
  return (

    <div className={styles.div}>
      <strong>{props.produtos.nome}</strong>
      <div>

        <Link href={`produto/${id}`}>Visualizar</Link>
      </div>
    </div>
  );
}
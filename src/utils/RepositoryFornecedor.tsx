import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  fornecedor: {
    nome: string;
    id: number;
  }
}

export function RepositoryClient(props: RepositoryClientProps) {
  const id = props.fornecedor.id;
  return (

    <div className={styles.div}>
      <strong>{props.fornecedor.nome}</strong>
      <div>

        <Link href={`${id}`}>Visualizar</Link>
      </div>
    </div>
  );
}
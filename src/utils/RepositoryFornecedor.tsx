import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  fornecedor: {
    nomeFornecedor: string;
    id: number;
  }
}

export function RepositoryClient(props: RepositoryClientProps) {
  const id = props.fornecedor.id;
  return (

    <div className={styles.div}>
      <strong>{props.fornecedor.nomeFornecedor}</strong>
      <div>

        <Link href={`fornecedor/${id}`}>Visualizar</Link>
      </div>
    </div>
  );
}
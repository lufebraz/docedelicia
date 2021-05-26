import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  fabricante: {
    nome: string;
    id: number;
  }
}

export function RepositoryClient(props: RepositoryClientProps) {
  const id = props.fabricante.id;
  return (

    <div className={styles.div}>
      <strong>{props.fabricante.nome}</strong>
      <div>

        <Link href={`fabricante/${id}`}>Visualizar</Link>
      </div>
    </div>
  );
}
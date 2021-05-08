import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  fabricante: {
    nomeFabricante: string;
    id: number;
  }
}

export function RepositoryClient(props: RepositoryClientProps) {
  const id = props.fabricante.id;
  return (

    <div className={styles.div}>
      <strong>{props.fabricante.nomeFabricante}</strong>
      <div>

        <Link href={`fabricante/${id}`}>Visualizar</Link>
      </div>
    </div>
  );
}
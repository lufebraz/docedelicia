import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  pessoa: {
    nome: string;
    tCelular: string;
    id: number;
  }
}

export function RepositoryClient(props: RepositoryClientProps) {
  const id = props.pessoa.id;
  return (
    
    <div className={styles.div}>
    <strong>{props.pessoa.nome}</strong>

    <div>

      <p>telefone: {props.pessoa.tCelular}</p>
      <Link href={`cliente/${id}`}>Visualizar</Link>
    </div>

  </div>
  );
}
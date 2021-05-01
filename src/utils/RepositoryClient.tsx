import Link from 'next/link';
import styles from './styles.module.scss';


interface RepositoryClientProps {
  pessoa: {
    nomeCliente: string;
    tcelular: string;
    id: number;
  }
}

export function RepositoryClient(props: RepositoryClientProps) {
  const id = props.pessoa.id;
  return (
    
    <div className={styles.div}>
    <strong>{props.pessoa.nomeCliente}</strong>

    <div>

      <p>telefone: {props.pessoa.tcelular}</p>
      <Link href={`cliente/${id}`}>Visualizar</Link>
    </div>

  </div>
  );
}
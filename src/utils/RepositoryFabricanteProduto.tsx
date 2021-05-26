
interface RepositoryFabricanteProps {
  fabricante: {
    nome: string;
    id: number;
  }
}

export function RepositoryFabricanteProduto(props: RepositoryFabricanteProps) {
  return (

    <option value={props.fabricante.id}>{props.fabricante.nome}</option>

  );
}
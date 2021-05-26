
interface RepositoryClientProps {
  fabricante: {
    nome: string;
    id: number;
  }
}

export function RepositoryFabricantePedido(props: RepositoryClientProps) {
  return (

    <option>{props.fabricante.nome}</option>

  );
}
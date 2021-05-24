
interface RepositoryClientProps {
  fabricante: {
    nomeFabricante: string;
    id: number;
  }
}

export function RepositoryFabricantePedido(props: RepositoryClientProps) {
  return (

    <option>{props.fabricante.nomeFabricante}</option>

  );
}
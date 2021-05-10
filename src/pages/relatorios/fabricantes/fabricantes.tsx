import styles from './styles.module.scss';
import { RepositoryClient } from '../../../utils/RepositoryFabricante';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { api } from '../../../services/api';


interface Fabricantes {
  nomeFabricante: string;  
  id: number;
}
type HomeProps = {
  fabricantes: Fabricantes[];
}
export default function ConsultarCliente({ fabricantes }: HomeProps) {
  const fabricantesList = [...fabricantes]

  return (
    <div>
      <div className={styles.div}>
        <h3>Lista de Fabricantes:</h3>
        <div className={styles.lista}>
          <ul>
            {fabricantesList.map(fabricantes => {
              return (<RepositoryClient key={fabricantes.id} fabricante={fabricantes} />)
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('fabricantes', {
    params: {
      _sort: 'nomeFabricante',
      _order: 'asc',
    }
  })

  const fabricantes = data.map(fabricantes => {
    return {
      nomeFabricante: fabricantes.nomeFabricante,      
      id: fabricantes.id,
    }
  });

  return {
    props: {
      fabricantes
    }
  }
}
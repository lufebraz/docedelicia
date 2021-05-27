import styles from './styles.module.scss';
import { RepositoryClient } from '../../../utils/RepositoryFabricante';
import { GetServerSideProps, GetStaticProps } from 'next';
import { api1 } from '../../../services/api';


interface Fabricantes {
  nome: string;  
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api1.get('fabricante', {
    params: {
      _sort: 'nome',
      _order: 'asc',
    }
  })

  const fabricantes = data.map(fabricantes => {
    return {
      nome: fabricantes.nome,      
      id: fabricantes.id,
    }
  });

  return {
    props: {
      fabricantes
    }
  }
}
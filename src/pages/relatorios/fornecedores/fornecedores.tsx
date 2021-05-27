import styles from '../fabricantes/styles.module.scss';
import { RepositoryClient } from '../../../utils/RepositoryFornecedor';
import { GetServerSideProps, GetStaticProps } from 'next';
import { api } from '../../../services/api';


interface Fornecedores {
  nome: string;  
  id: number;
}
type HomeProps = {
  fornecedores: Fornecedores[];
}
export default function ConsultarCliente({ fornecedores }: HomeProps) {
  const fornecedoresList = [...fornecedores]

  return (
    <div>

      <div className={styles.div}>
        

        <h3>Lista de Fornecedores:</h3>
        
        <div className={styles.lista}>
          <ul>
            {fornecedoresList.map(fornecedores => {
              return (<RepositoryClient key={fornecedores.id} fornecedor={fornecedores} />)
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('fornecedores', {
    params: {
      _sort: 'nome',
      _order: 'asc',
    }
  })

  const fornecedores = data.map(fornecedores => {
    return {
      nome: fornecedores.nome,      
      id: fornecedores.id,
    }
  });

  return {
    props: {
      fornecedores
    }
  }
}
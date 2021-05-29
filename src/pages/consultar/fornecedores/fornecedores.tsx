import styles from '../fabricantes/list.module.scss';
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';


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
            
          </ul>
        </div>
      </div>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('fornecedores', {
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
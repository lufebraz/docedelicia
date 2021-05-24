import styles from '../fabricantes/styles.module.scss';
import { RepositoryProduto } from '../../../utils/RepositoryProduto';
import { GetStaticProps } from 'next';
import { api } from '../../../services/api';

type Produtos = {
  nomeProduto: string,
  descricao: string,
  recheio: string,
  tipoUnidade: string,
  categoria: string,
  formato: string,
  fabricante: string,
  id:number
}

type HomeProps = {
  produtos: Produtos[];
}
export default function ConsultarCliente({ produtos }: HomeProps) {
  const produtosList = [...produtos]

  return (
    <div>
      <div className={styles.div}>
        <h3>Lista de Fabricantes:</h3>
        <div className={styles.lista}>
          <ul>
            {produtosList.map(produtos => {
              return (<RepositoryProduto key={produtos.id} produtos={produtos} />)
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('produtos', {
    params: {
      _sort: 'nomeProduto',
      _order: 'asc',
    }
  })

  const produtos = data.map(produtos => {
    return {
      nomeProduto: produtos.nomeProduto,      
      id: produtos.id,
    }
  });

  return {
    props: {
      produtos
    }
  }
}
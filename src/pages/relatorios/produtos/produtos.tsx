import styles from '../fabricantes/styles.module.scss';
import { GetServerSideProps } from 'next';
import { api } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';
import Link from 'next/link';

type Produtos = {
  nome: string,
  descricao: string,
  recheio: string,
  tipoUnidade: string,
  categoria: string,
  formato: string,
  fabricante: string,
  id: number
}

type HomeProps = {
  produtos: Produtos[];
}
export default function ConsultarCliente({ produtos }: HomeProps) {
  const produtosList = [...produtos]

  return (
    <>
      <NavMenu1 />
      <div>
        <div className={styles.div}>
          <h3>Lista de Produtos:</h3>
          <br />
          <div className={styles.lista}>
            <ul>
              {produtosList.map(produtos => {
                return (
                  <div key={produtos.id} className={styles.repo}>
                    <h3>{produtos.nome}</h3>
                    <Link href={`produto/${produtos.id}`}>Visualizar</Link>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('produto', {
    params: {
      _sort: 'nome',
      _order: 'asc',
    }
  })

  const produtos = data.map(produtos => {
    return {
      nome: produtos.nome,
      id: produtos.id,
    }
  });

  return {
    props: {
      produtos
    },
  }
}
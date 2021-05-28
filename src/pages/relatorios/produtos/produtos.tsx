import styles from '../fabricantes/styles.module.scss';
import { GetServerSideProps } from 'next';
import { raspberry } from '../../../services/api';
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await raspberry.get('produto')

  const produtos = data.map(produtos => {
    return {
      nome: produtos.nome,
      id: produtos.id,
    }
  });

  return {
    props: {
      produtos
    }
  }
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
                    <strong>{produtos.nome}</strong>
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


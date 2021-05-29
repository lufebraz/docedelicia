import styles from '../fabricantes/list.module.scss';
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';
import Link from 'next/link';

type Produtos = {
  id: number,
  nome: string,
  ativo: number, 
}

type HomeProps = {
  produtos: Produtos[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('produto')

  const produtos = data.map(produtos => {
    return {
      nome: produtos.nome,
      id: produtos.id,
      ativo: produtos.ativo
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
                    <strong className={produtos.ativo == 1 ? styles.on : styles.off}>{produtos.ativo == 1 ? 'on' : 'off'}</strong>
                    <Link href={`produtos/${produtos.id}`}>Visualizar</Link>
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


import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import { NavMenu1 } from '../../../components/NavBar';
import Link from 'next/link';
import VMasker from 'vanilla-masker';

type Clientes = {
  id: number,
  nome: string,
  tCelular: string,
  tFixo: string,
  ativo: number,
}
type HomeProps = {
  clientes: Clientes[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('cliente/false')

  const clientes = data.map(clientes => {
    return {
      nome: clientes.nome,
      tCelular: clientes.tCelular,
      tFixo: clientes.tFixo,
      id: clientes.id,
      ativo: clientes.ativo
    }
  });

  return {
    props: {
      clientes
    }
  }
}

export default function ConsultarCliente({ clientes }: HomeProps) {
  const clientesList = [...clientes]

  return (
    <>
      <NavMenu1 />
      <div className={styles.div}>

        <h3>Lista de Clientes:</h3>

        <div className={styles.lista}>
          <ul>
            {clientesList.map(clientes => {
              return (
                <div key={clientes.id} className={styles.repo}>
                  <strong >{clientes.nome}</strong>
                  <strong >{
                    !!clientes.tCelular ?
                      VMasker.toPattern((clientes.tCelular), "(99) 99999-9999") :
                      VMasker.toPattern((!!clientes.tFixo ? clientes.tFixo : ''), "(99) 9999-9999")
                  }</strong>
                  <strong className={clientes.ativo == 1 ? styles.on : styles.off}>{clientes.ativo == 1 ? '✅' : '🚫'}</strong>
                  <Link href={`clientes/${clientes.id}`}>🔍</Link>
                </div>
              )
            })}
          </ul>
        </div>

      </div>
    </>

  )
}

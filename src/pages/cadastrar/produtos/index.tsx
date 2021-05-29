import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavMenu } from '../../../components/NavBar';
import styles from './styles.module.scss';
import Router from 'next/router'
import { GetServerSideProps } from 'next';
import { heroku } from '../../../services/api';
import Link from 'next/link';


type Produto = {
  nome: string,
  descricao: string,
  recheio: string,
  tipoUnidade: string,
  categoria: string,
  formato: string,
  fabricanteId: string,
  preco: number,
  ativo: number
}
type Fabricantes = {
  nome: string;
  id: number;
}
type HomeProps = {
  fabricantes: Fabricantes[];
}

export default function Produtos({ fabricantes }: HomeProps) {
  const fabricantesList = [...fabricantes]

  const { register, handleSubmit } = useForm<Produto>();
  const onSubmit = handleSubmit(async (values) => {

    await axios({
      method: 'POST',
      url: 'https://docedelicia.herokuapp.com/api/produto',
      headers: { 'Produto': 'dados do produto' },
      data: values
    })

    Router.push(`/relatorios/produtos/`)
  })


  return (

    <main >
      <NavMenu />
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
          <input type="text" value="1" {...register('ativo')} className={styles.hidden} readOnly />
          <h3>Dados do Produto:</h3>

          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Nome do produto: </label>
              <input type="text" required {...register('nome')} />
            </div>
            <div className={styles.formitem}>

              <label >Tipo de unidade: </label>
              <select name="unidade" {...register('tipoUnidade')} required>
                <option value="">-</option>
                <option value="un">Unidade</option>
                <option value="kilo">Kg</option>
                <option value="grama">Gramas</option>
                <option value="litro">Litro</option>
                <option value="mililitro">ML</option>
              </select>
            </div>
            <div className={styles.formitem}>
              <label >Preço:</label>
              <input type="number" min="0.00" max="10000.00" step="0.01" required {...register('preco')} className={styles.input} />
            </div>
          </div>
          <div className={styles.formgroup}>
            <div className={styles.formitem}>

              <label >Descrição:</label>
              <input type="text" {...register('descricao')} />
            </div>
            <div className={styles.formitem}>

              <label >Categoria: </label>
              <select name="categoria" {...register('categoria')} required>
                <option value="">-</option>
                <option value="bolos">Bolos</option>
                <option value="salgados">Salgados</option>
                <option value="tortas">Tortas</option>
                <option value="bebidas">Bebidas</option>
                <option value="doces">Doces</option>
                <option value="topo">Topo</option>
                <option value="sobremesas">Sobremesas</option>
              </select>

            </div>
          </div>
          <div className={styles.formgroup}>

            <div className={styles.formitem}>
              <label >Recheios:</label>
              <input type="text" {...register('recheio')} />
              {/* <div>
                <input type="checkbox" name="nutella" {...register('recheio')} />
                <label htmlFor="nutella" >Nutella</label>
              </div>
              <div>
                <input type="checkbox" name="chocolate" {...register('recheio')} />
                <label >Chocolate</label>
              </div>
              <div>
                <input type="checkbox" name="morango" {...register('recheio')} />
                <label >Morango</label>
              </div>
              <div>
                <input type="checkbox" name="coco" {...register('recheio')} />
                <label >Coco</label>
              </div>
              <div>
                <input type="checkbox" name="amendoim" {...register('recheio')} />
                <label >Amendoim</label>
              </div> */}
            </div>

            <div className={styles.formitem}>
              <label >Formatos: </label>
              <select name="formato" {...register('formato')}>
                <option value="">-</option>
                <option value="redondo">redondo</option>
                <option value="retangular">retangular</option>
                <option value="personalizado">personalizado</option>
              </select>
              {/* <div>
                <input type="checkbox" name="redondo" {...register('formato')} />
                <label >Redondo</label>
              </div>
              <div>
                <input type="checkbox" name="retangular" {...register('formato')} />
                <label >Retangular</label>
              </div>
              <div>
                <input type="checkbox" name="personalizado" {...register('formato')} />
                <label >Personalizado</label>
              </div> */}
            </div>

          </div>
          <label >Fabricante: </label>
          <select name="fabricanteId" {...register('fabricanteId')} required>
            <option value="">-</option>
            {fabricantesList.map(fabricantes => {
              return (<option key={fabricantes.id} value={fabricantes.id}>{fabricantes.nome}</option>)
            })}
          </select>
          <div className={styles.formgroup}>

            <input type="submit" value="Cadastrar" className={styles.button} />

            <button className={styles.button}><Link href="/">Cancelar</Link></button>
          </div>
        </form>

      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await heroku.get('fabricante/ativos', {
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
import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../../../services/api';
import styles from './styles.module.scss';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router'

type Cliente = {
  id: number,
  nomeCliente: string,
  email: string,
  dtNasc: string,
  tcelular: string,
  tfixo: string,
  cpf: string,
  genero: string,
  ativo: number,
  endereco: {
    nomeEndereco: string,
    cep: string,
    logradouro: string,
    numero: string,
    cidade: string,
    bairro: string,
    uf: string,
    complemento: string
  }
}
type ClienteProps = {
  cliente: Cliente;
}


export default function Cliente({ cliente }: ClienteProps) {
  const {register, handleSubmit } = useForm<Cliente>();
  const onSubmit =  handleSubmit(async (values) =>{    
    await axios({
      method:'PUT',      
      url: `http://localhost:3333/clients/${cliente.id}`,
      headers: {'Cliente': 'dados do cliente'},
      data: values
    })
    Router.push(`/relatorios/clientes/clientes`)
  })
  return (
    <main>
      
      <form onSubmit={onSubmit} className={styles.form} >
        <div className={styles.dadosCliente}>
          <div>
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nomeCliente" defaultValue={cliente.nomeCliente} required {...register("nomeCliente")}/> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email"  defaultValue={cliente.email} required  {...register("email")}/><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNasc" type="date" defaultValue={cliente.dtNasc} max="2003-12-31" {...register("dtNasc")}/><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tcelular" defaultValue={cliente?.tcelular} maxLength={11}{...register("tcelular")} required /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tfixo" defaultValue={cliente?.tfixo} maxLength={10} {...register("tfixo")}/><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} name="cpf" value={cliente.cpf} required maxLength={11} {...register("cpf")}/><br />

            <label>gênero: </label><br />
            <select name="genero" className={styles.inputCurto} defaultValue={cliente.genero} {...register("genero")}>
              <option value="N">Não Especificado</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>

          </div>
        </div>

        <hr />

        <div className={styles.enderecoCliente}>
          <div>
            <h3>Endereço do cliente:</h3>

            <label> Nome do endereço:  </label><br />
            <input name="nomeEndereco" defaultValue={cliente.endereco?.nomeEndereco} {...register("endereco.nomeEndereco")} /> <br />
            <div>
              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" defaultValue={cliente.endereco?.logradouro} {...register("endereco.logradouro")} /> <br />
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" defaultValue={cliente.endereco?.numero} maxLength={10} {...register("endereco.numero")}/> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" defaultValue={cliente.endereco?.cep} maxLength={8} {...register("endereco.cep")} /> <br />
              </label>
            </div>
            <div >
              <label >Bairro: <br />
                <input className={styles.tamanhoMedio} name="bairro" defaultValue={cliente.endereco?.bairro} {...register("endereco.bairro")}/><br />
              </label >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" defaultValue={cliente.endereco?.cidade} {...register("endereco.cidade")}/><br />
              </label>
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" maxLength={2} defaultValue={cliente.endereco?.uf} {...register("endereco.uf")} />
              </label>
            </div>
          </div>

          <div>
            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" defaultValue={cliente.endereco?.complemento} {...register("endereco.complemento")}/>
            <br/><label> Cliente ativo? </label> <br/>
            <select className={styles.inputCurto} defaultValue={cliente?.ativo} {...register('ativo')}>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
            <div className={styles.buttons}>
              <button type="button"><Link  href={`../clientes`}>Voltar</Link></button>
              <button className="salvar" type="submit">Atualizar</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/clients/${slug}`)

  const cliente = {
    id: data.id,
    nomeCliente: data.nomeCliente,
    email: data.email,
    dtNasc: data.dtNasc,
    tcelular: data.tcelular,
    tfixo:data.tfixo,
    cpf: data.cpf,
    genero: data.genero,
    ativo: data.ativo,
    endereco: {
      nomeEndereco: data.endereco.nomeEndereco,
      cep: data.endereco.cep,
      logradouro: data.endereco.logradouro,
      numero: data.endereco.numero,
      cidade: data.endereco.cidade,
      bairro: data.endereco.bairro,
      uf: data.endereco.uf,
      complemento: data.endereco.complemento
    }
  };

  return {
    props: {
      cliente
    },
    revalidate: 60 * 60 * 24, //24h
  }
}

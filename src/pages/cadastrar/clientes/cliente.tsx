import { NavMenu } from '../../../components/NavBar';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Router from 'next/router'
import { useEffect, useState } from 'react';
import VMasker from 'vanilla-masker';
import { buscarEndereco } from '../../../services/api'
import { GetServerSideProps } from 'next';

type Cliente = {
  nomeCliente: string;
  email: string;
  dtNasc: string;
  tcelular: string;
  tfixo: string;
  cpf: string;
  genero: string;
  ativo: number;
  endereco: {
    nomeEndereco: string;
    cep: string;
    logradouro: string;
    numero: string;
    cidade: string;
    bairro: string;
    uf: string;
    complemento: string;
  }
}
type Endereco = {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}
type EnderecoProps = {
  endereco: Endereco;
}

export default function Cadastrar({ endereco }: EnderecoProps) {
  const { register, handleSubmit } = useForm<Cliente>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:3333/clients',
      headers: { 'Cliente': 'dados do cliente' },
      data: values
    })
    Router.push(`/relatorios/clientes/clientes`)
  })


  const [tel, setTel] = useState('')
  useEffect(() => {
    setTel(VMasker.toPattern(tel, "(99) 9 9999-9999"))
  }, [tel])
  const [telFixo, setTelFixo] = useState('')
  useEffect(() => {
    setTelFixo(VMasker.toPattern(telFixo, "(99) 9999-9999"))
  }, [telFixo])
  const [cpf, setCpf] = useState('')
  useEffect(() => {
    setCpf(VMasker.toPattern(cpf, "999.999.999-99"))
  }, [cpf]);
  const [cep, setCep] = useState('')
  useEffect(() => {
    setCep(VMasker.toPattern(cep, "99999-999"))
  }, [cep])
  // function settarCep() {

  //   const [endereco, setEndereco] = useState<Endereco>({} as Endereco);
  //   useEffect(() => {
  //     fetch(`https://viacep.com.br/ws/${cep}/json/`)
  //       .then(response => response.json())
  //       .then(data => setEndereco(data))
  //   }, [cep]);
  //   return endereco;
  // }

  return (
    <main>
      <NavMenu />
      <form onSubmit={onSubmit} className={styles.form} >
        <div className={styles.dadosCliente}>
          <div>
            <input type="number" value="1" {...register("ativo")} className={styles.hidden} />
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nomeCliente" placeholder="Jose da Silva" required {...register("nomeCliente")} /> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email" placeholder="josesilva@exemplo.com" required {...register("email")} /><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNasc" type="date" placeholder="dd/mm/aaaa" max="2010-01-01" min="1900-01-01" required {...register("dtNasc")} /><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tcelular" placeholder="(00) 12345-6789" required {...register("tcelular")} onChange={e => setTel(e.target.value)} value={tel} autoComplete="off" /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tfixo" placeholder="(00) 1234-5678" {...register("tfixo")} onChange={e => setTelFixo(e.target.value)} value={telFixo} autoComplete="off" /><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} id="cpf" name="cpf" placeholder="111.222.333-44" required {...register("cpf")} onChange={e => setCpf(e.target.value)} value={cpf} autoComplete="off" /><br />

            <label>gênero: </label><br />
            <select name="genero" className={styles.inputCurto} {...register("genero")}>
              <option value="">-</option>
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
            <input name="nomeEndereco" placeholder="Casa / Trabalho" {...register("endereco.nomeEndereco")} /> <br />

            <div>

              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" placeholder="Av. Principal" {...register("endereco.logradouro")} /> <br />
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" placeholder="201" maxLength={6} {...register("endereco.numero")} /> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" placeholder="12345-678" {...register("endereco.cep")} onChange={e => setCep(e.target.value)} value={cep} autoComplete="off" /> <br />
              </label>
            </div>



            <div >
              <label >Bairro: <br />
                <input className={styles.tamanhoMedio} name="bairro" placeholder="Asa Norte" {...register("endereco.bairro")} /><br />
              </label >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" placeholder="Brasília" {...register("endereco.cidade")} /><br />
              </label>
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" placeholder="DF" maxLength={2} {...register("endereco.uf")} />
              </label>
            </div>

          </div>

          <div>

            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" maxLength={40} {...register("endereco.complemento")} />

            <div className={styles.buttons}>
              <button type="button"><Link href="/">Cancelar</Link></button>
              <button className="salvar" type="submit" >Salvar</button>
            </div>

          </div>

        </div>
      </form>
    </main>
  )
}

// export const getServerSideProps: GetServerSideProps = async (cep) => {

//   const { data } = await buscarEndereco.get(`71691-019/json`)

//   const endereco = {
//     logradouro: data.logradouro,
//     bairro: data.bairro,
//     localidade: data.localidade,
//     uf: data.uf
//   }

//   return {
//     props: {
//       endereco
//     }
//   }
// }
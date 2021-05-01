import { NavMenu } from '../../components/NavBar';
import styles from './styles.module.scss';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import axios from 'axios';

type Cliente = {
  nomeCliente: string;
  email: string;
  dtNasc: string;
  tcelular: string;
  tfixo: string;
  cpf: string;
  genero: string;
  endereco:{
    nomeEndereco:string;
    cep:string;
    logradouro:string;
    numero:string;
    cidade:string;
    bairro:string;
    uf:string;
    complemento:string;
  }
}
export default function Cadastrar() {
  const {register, handleSubmit } = useForm<Cliente>();
  const onSubmit =  handleSubmit(async (values) =>{    
    await axios({
      method:'POST',      
      url: 'http://localhost:3333/clients',
      headers: {'Cliente': 'dados do cliente'},
      data: values
    })
  })

  return (
    <main>
      <NavMenu />
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.dadosCliente}>
          <div>
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nomeCliente" placeholder="Jose da Silva" required {...register("nomeCliente")} /> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email" placeholder="josesilva@exemplo.com" required {...register("email")} /><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNasc" type="date" placeholder="dd/mm/aaaa" max="2003-12-31" required {...register("dtNasc")}/><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tcelular" placeholder="(00) 12345-6789" maxLength={11} required {...register("tcelular")}/><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tfixo" placeholder="(00) 1234-5678" maxLength={10} {...register("tfixo")}/><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} name="cpf" placeholder="123.456.789-12" maxLength={11} required {...register("cpf")}/><br />

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
            <input  name="nomeEndereco" placeholder="Casa / Trabalho" {...register("endereco.nomeEndereco")}/> <br />

            <div>

              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" placeholder="Av. Principal" {...register("endereco.logradouro")}/> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" placeholder="12345-678" maxLength={8} {...register("endereco.cep")}/> <br /> 
                
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" placeholder="201" maxLength={6} {...register("endereco.numero")}/> <br />
              </label>
            </div>
            


            <div >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" placeholder="Brasília" {...register("endereco.cidade")}/><br />
              </label>
              <label >Bairro: <br />
                <input className={styles.tamanhoMedio} name="bairro" placeholder="Asa Norte" {...register("endereco.bairro")}/><br />
              </label >
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" placeholder="DF" maxLength={2} {...register("endereco.uf")} />
              </label>
            </div>

          </div>

          <div>

            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" maxLength={40} {...register("endereco.complemento")} />

            <div className={styles.buttons}>
              <button type="button"><Link href="/"> Cancelar</Link></button>
              <button className="salvar" type="submit">Salvar</button>
            </div>

          </div>

        </div>
      </form>
    </main>
  )
}


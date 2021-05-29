import { NavMenu } from '../../../components/NavBar';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Router from 'next/router'
import { useEffect, useState } from 'react';
import VMasker from 'vanilla-masker';

type Cliente = {
  nome: string;
  email: string;
  dtNascimento: string;
  tCelular: string;
  tFixo: string;
  cpf: string;
  genero: string;
  ativo: number;
  endereco: [
    {
      nome: string;
      cep: string;
      estado: string;
      cidade: string;
      logradouro: string;
      numero: number;
      complemento: string;
      referencia: string;
      ativo: number;
    }
  ]
}

export default function Cadastrar() {
  const { register, handleSubmit } = useForm<Cliente>();
  const onSubmit = handleSubmit(async (values) => {
   values.tCelular = VMasker.toPattern(values.tCelular, "99999999999")
   values.tFixo = !!values.tFixo ? VMasker.toPattern(values.tFixo, "9999999999") : null
   values.endereco[0].cep = VMasker.toPattern(values.endereco[0].cep, "99999999")
   values.cpf = VMasker.toPattern(values.cpf,"99999999999")
   values.email = !!values.email ? values.email : null
   values.genero = !!values.genero ? values.genero : null
   values.endereco[0].complemento = !!values.endereco[0].complemento ? values.endereco[0].complemento : null
   values.endereco[0].referencia = !!values.endereco[0].referencia ? values.endereco[0].referencia : null

    await axios({
      method: 'POST',
      url: 'https://docedelicia.herokuapp.com/api/cliente',
      headers: { 'Cliente': 'dados do cliente' },
      data: values
    })
    Router.push(`/relatorios/clientes/clientes`)
  })


  const [tel, setTel] = useState('')
  useEffect(() => {
    setTel(VMasker.toPattern(tel, "(99) 99999-9999"))
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

  return (
    <main>
      <NavMenu />
      <form onSubmit={onSubmit} className={styles.form} >
        <div className={styles.dadosCliente}>
          <div>
            <input type="number" value={1} {...register("ativo")} className={styles.hidden} />
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nomeCliente" placeholder="Jose da Silva" required {...register("nome")} /> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email" placeholder="josesilva@exemplo.com" {...register("email")} /><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNasc" type="date" placeholder="dd/mm/aaaa" max="2010-01-01" min="1900-01-01" required {...register("dtNascimento")} /><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tcelular" placeholder="(00) 12345-6789" required {...register("tCelular")} minLength={11} onChange={e => setTel(e.target.value)} value={tel} autoComplete="off" /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tfixo" placeholder="(00) 1234-5678" {...register("tFixo")} minLength={10} onChange={e => setTelFixo(e.target.value)} value={telFixo} autoComplete="off" /><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} id="cpf" name="cpf" placeholder="111.222.333-44" required {...register("cpf")} minLength={14} onChange={e => setCpf(e.target.value)} value={cpf} autoComplete="off" /><br />

            <label>gênero: </label><br />
            <select name="genero" className={styles.inputCurto} {...register("genero")}>
              <option value="">-</option>
              <option value="n">Não Especificado</option>
              <option value="m">Masculino</option>
              <option value="f">Feminino</option>
            </select>

          </div>
          <br className={styles.br} />
        </div>

        <hr />

        <div className={styles.enderecoCliente}>
          <div>
            <h3>Endereço do cliente:</h3>
            <input type="number" value={1} {...register("endereco.0.ativo")} className={styles.hidden} />
            <label> Nome do endereço:  </label><br />
            <input name="nome" placeholder="Casa / Trabalho" {...register("endereco.0.nome")} required /> <br />

            <div>

              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" placeholder="Av. Principal" {...register("endereco.0.logradouro")}required /> <br />
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" placeholder="201" maxLength={6} {...register("endereco.0.numero")} required/> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" placeholder="12345-678" {...register("endereco.0.cep")} minLength={8} onChange={e => setCep(e.target.value)} value={cep} autoComplete="off" required /> <br />
              </label>
            </div>



            <div >
              <label >Referência: <br />
                <input className={styles.tamanhoMedio} name="bairro" placeholder="Asa Norte" {...register("endereco.0.referencia")} /><br />
              </label >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" placeholder="Brasília" {...register("endereco.0.cidade")} required/><br />
              </label>
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" placeholder="DF" maxLength={2} {...register("endereco.0.estado")} required />
              </label>
            </div>

          </div>

          <div>

            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" maxLength={40} {...register("endereco.0.complemento")} />

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
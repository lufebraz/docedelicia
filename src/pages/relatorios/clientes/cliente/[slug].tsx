import { GetServerSideProps } from 'next';
import { heroku } from '../../../../services/api';
import styles from './styles.module.scss';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router'
import { useEffect, useState } from 'react';
import VMasker from 'vanilla-masker';
import { format, parseISO } from 'date-fns';

type Cliente = {
  nome: string;
  email: string;
  dtNascimento: string;
  tCelular: string;
  tFixo: string;
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
  id: number;
}
type ClienteProps = {
  cliente: Cliente;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await heroku.get(`cliente/${slug}`)

  const cliente = {
    id: data.id,
    nome: data.nome,
    email: data.email,
    dtNascimento: format(parseISO(data.dtNascimento), 'yyyy-MM-dd'),
    tCelular: data.tCelular,
    tFixo: data.tFixo,
    cpf: data.cpf,
    genero: data.genero,
    ativo: data.ativo,
    // endereco: {
    //   nomeEndereco: data.endereco.nomeEndereco,
    //   cep: data.endereco.cep,
    //   logradouro: data.endereco.logradouro,
    //   numero: data.endereco.numero,
    //   cidade: data.endereco.cidade,
    //   bairro: data.endereco.bairro,
    //   uf: data.endereco.uf,
    //   complemento: data.endereco.complemento
    // }
  };

  return {
    props: {
      cliente
    }
  }
}
export default function Cliente({ cliente }: ClienteProps) {
  const { register, handleSubmit } = useForm<Cliente>();
  const onSubmit = handleSubmit(async (values) => {
    await axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/cliente/${cliente.id}`,
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
    setTelFixo(VMasker.toPattern(telFixo, "(99)9999-9999"))
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

      <form onSubmit={onSubmit} className={styles.form} >
        <div className={styles.dadosCliente}>
          <div>
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nome" defaultValue={cliente.nome} required {...register("nome")} /> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email" defaultValue={cliente.email} required  {...register("email")} /><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNascimento" type="date" defaultValue={cliente.dtNascimento} max="2003-12-31" {...register("dtNascimento")} /><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tCelular" defaultValue={cliente?.tCelular} maxLength={15}{...register("tCelular")} required autoComplete="off" /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tFixo" defaultValue={cliente?.tFixo} maxLength={14} {...register("tFixo")} /><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} name="cpf" value={cliente.cpf} required maxLength={11} minLength={11} {...register("cpf")} /><br />

            <label>gênero: </label><br />
            <select name="genero" className={styles.inputCurto} defaultValue={cliente.genero} {...register("genero")}>
              <option value="n">Não Especificado</option>
              <option value="m">Masculino</option>
              <option value="f">Feminino</option>
            </select>
          </div>
          <br />
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
                <input className={styles.inputMtCurto} name="numero" defaultValue={cliente.endereco?.numero} maxLength={10} {...register("endereco.numero")} /> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" defaultValue={cliente.endereco?.cep} maxLength={8} {...register("endereco.cep")} /> <br />
              </label>
            </div>
            <div >
              <label >Bairro: <br />
                <input className={styles.tamanhoMedio} name="bairro" defaultValue={cliente.endereco?.bairro} {...register("endereco.bairro")} /><br />
              </label >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" defaultValue={cliente.endereco?.cidade} {...register("endereco.cidade")} /><br />
              </label>
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" maxLength={2} defaultValue={cliente.endereco?.uf} {...register("endereco.uf")} />
              </label>
            </div>
          </div>

          <div>
            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" defaultValue={cliente.endereco?.complemento} {...register("endereco.complemento")} />
            <br /><label> Cliente ativo? </label> <br />
            <select className={styles.inputCurto} defaultValue={cliente?.ativo} {...register('ativo')}>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
            <div className={styles.buttons}>
              <button type="button"><Link href={`../clientes`}>Voltar</Link></button>
              <button className="salvar" type="submit">Atualizar</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

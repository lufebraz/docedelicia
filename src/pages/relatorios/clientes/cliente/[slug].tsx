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
  id: number;
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
      id: number;
      clienteId: number;
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
type ClienteProps = {
  cliente: Cliente;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await heroku.get(`cliente/${slug}`)

  const cliente = {
    id: data.id,
    nome: data.nome,
    tCelular: VMasker.toPattern(data.tCelular, "(99) 99999-9999"),
    tFixo: VMasker.toPattern(data.tFixo, "(99) 9999-9999"),
    cpf: VMasker.toPattern(data.cpf,"999.999.999-99"),
    dtNascimento: format(parseISO(data.dtNascimento), 'yyyy-MM-dd'),
    genero: data.genero,
    email: data.email,
    ativo: data.ativo,
    endereco: [
      {
        id: data.endereco[0].id,
        nome: data.endereco[0].nome,
        cep: VMasker.toPattern(data.endereco[0].cep,"99999-999"),
        estado: data.endereco[0].estado,
        cidade: data.endereco[0].cidade,
        logradouro: data.endereco[0].logradouro,
        numero: data.endereco[0].numero,
        complemento: data.endereco[0].complemento,
        referencia: data.endereco[0].referencia,
        ativo: data.endereco[0].ativo,
        clienteId: data.endereco[0].clienteId,
      }
    ]
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
   values.tCelular = VMasker.toPattern(values.tCelular, "99999999999")
   values.tFixo = !!values.tFixo ? VMasker.toPattern(values.tFixo, "9999999999") : null
   values.endereco[0].cep = VMasker.toPattern(values.endereco[0].cep, "99999999")
   values.cpf = VMasker.toPattern(values.cpf,"99999999999")
   values.email = !!values.email ? values.email : null
   values.genero = !!values.genero ? values.genero : null
    await axios({
      method: 'PUT',
      url: `https://docedelicia.herokuapp.com/api/cliente/${cliente.id}`,
      headers: { 'Cliente': 'dados do cliente' },
      data: values
    })
    Router.push(`/relatorios/clientes/clientes`)
  })
  const [tel, setTel] = useState(cliente.tCelular)
  useEffect(() => {
    setTel(VMasker.toPattern(tel, "(99) 9 9999-9999"))
  }, [tel])
  const [telFixo, setTelFixo] = useState(!!cliente.tFixo ? cliente.tFixo : '')
  useEffect(() => {
    setTelFixo(VMasker.toPattern(telFixo, "(99) 9999-9999"))
  }, [telFixo])  
  const [cep, setCep] = useState(cliente.endereco[0].cep)
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
                <input className={styles.inputCurto} name="tCelular" defaultValue={cliente?.tCelular}{...register("tCelular")} onChange={e => setTel(e.target.value)} value={tel} required autoComplete="off" /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tFixo" defaultValue={cliente?.tFixo} maxLength={14} {...register("tFixo")} onChange={e => setTelFixo(e.target.value)} value={telFixo}/><br />
              </label>
            </div>
            <div >
              <div className={styles.cpf}>

              <label >CPF: </label><br />
              <input className={styles.inputCurto} name="cpf" value={cliente.cpf} {...register('cpf')} /><br />
              </div>
              <div className={styles.cpf}>

              <label>gênero: </label> <br />
              <select name="genero" className={styles.inputCurto} defaultValue={cliente.genero} {...register("genero")}>
                <option value="n">Não Especificado</option>
                <option value="m">Masculino</option>
                <option value="f">Feminino</option>
              </select>
              </div>
            </div>
            <label> Cliente ativo? </label> <br />
            <select className={styles.inputCurto} defaultValue={cliente?.ativo} {...register('ativo')}>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
            <br />
          </div>
        </div>

        <hr />

        <div className={styles.enderecoCliente}>
          <div>
            <h3>Endereço do cliente:</h3>

            <label> Nome do endereço:  </label><br />
            <input name="nomeEndereco" defaultValue={cliente.endereco[0]?.nome} {...register("endereco.0.nome")} /> <br />
            <div>
              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" defaultValue={cliente.endereco[0]?.logradouro} {...register("endereco.0.logradouro")} /> <br />
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" defaultValue={cliente.endereco[0]?.numero} maxLength={10} {...register("endereco.0.numero")} /> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" defaultValue={cliente.endereco[0]?.cep} maxLength={8} {...register("endereco.0.cep")} /> <br />
              </label>
            </div>
            <div >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" defaultValue={cliente.endereco[0]?.cidade} {...register("endereco.0.cidade")} /><br />
              </label>
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" maxLength={2} defaultValue={cliente.endereco[0]?.estado} {...register("endereco.0.estado")} />
              </label>
            </div>
          </div>
          <input type="enderecoid" className={styles.hidden} value={cliente.endereco[0].id} {...register("endereco.0.id")} />
          <div>
            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" defaultValue={cliente.endereco[0]?.complemento} {...register("endereco.0.complemento")} />
            <br /><label >Referência: <br />
              <input className={styles.complemento} name="bairro" defaultValue={cliente.endereco[0]?.referencia} {...register("endereco.0.referencia")} /><br />
            </label >
            <br /><label> Endereço ativo? </label> <br />
            <select className={styles.inputCurto} defaultValue={cliente.endereco[0].ativo} {...register('endereco.0.ativo')}>
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

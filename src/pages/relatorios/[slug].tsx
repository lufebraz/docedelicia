import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../services/api';
import styles from '../cadastrar/styles.module.scss';
import { useEffect, useState } from 'react';
import VMasker from 'vanilla-masker';
import Link from 'next/link';

type Cliente = {
  id: number,
  active: boolean,
  nomeCliente: string,
  email: string,
  dt_nasc: string,
  tcelular: string,
  tfixo: string,
  cpf: string,
  gender: string,
  address: {
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

interface Endereco {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}


export default function Cliente({ cliente }: ClienteProps) {

  const [cep, setCep] = useState('71691019');
  const [endereco, setEndereco] = useState<Endereco>({} as Endereco);
  useEffect(() => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => setEndereco(data))
  }, [cep]);
  const [cep1, setCep1] = useState('');
  useEffect(() => {
    setCep1(VMasker.toPattern(cep1, "99999-999"));
  }, [cep1]);

  const [cpf, setCpf] = useState('');
  useEffect(() => {
    setCpf(VMasker.toPattern(cpf, "999.999.999-99"));
  }, [cpf]);

  const [tel, setTel] = useState('');
  useEffect(() => {
    setTel(VMasker.toPattern(tel, "(99) 9 9999-9999"));
  }, [tel]);

  const [telfixo, setTelfixo] = useState('');
  useEffect(() => {
    setTelfixo(VMasker.toPattern(telfixo, "(99) 9999-9999"));
  }, [telfixo]);

  return (
    <main>
      
      <form action={`http://localhost:3333/clients/${cliente.id}`} className={styles.form} method="update">
        <div className={styles.dadosCliente}>
          <div>
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nomeCliente" defaultValue={cliente.nomeCliente} required /> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email"  defaultValue={cliente.email} required /><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNasc" type="date" defaultValue={cliente.dt_nasc} max="2003-12-31" /><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tcelular" defaultValue={cliente?.tcelular} onChange={e => setTel(e.target.value)} required /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tfixo" defaultValue={cliente?.tfixo} onChange={e => setTelfixo(e.target.value)}  /><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} name="cpf" defaultValue={cliente.cpf} required onChange={e => setCpf(e.target.value)}  /><br />

            <label>gênero: </label><br />
            <select name="genero" className={styles.inputCurto}>
              <option value="">{cliente.gender}</option>
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
            <input name="nomeEndereco" defaultValue={cliente.address.nomeEndereco}/> <br />

            <div>
              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" defaultValue={cliente.address.logradouro} /> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" defaultValue={cliente.address.cep} onChange={e => setCep1(e.target.value)}  /> <br />
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" defaultValue={cliente.address.numero} maxLength={10} /> <br />
              </label>
            </div>
            {/* onBlur={e => setCep(e.target.value)} */}


            <div >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" defaultValue={cliente.address.cidade} /><br />
              </label>
              <label >Bairro: <br />
                <input className={styles.tamanhoMedio} name="bairro" defaultValue={cliente.address.bairro} /><br />
              </label >
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" maxLength={2} defaultValue={cliente.address.uf} />
              </label>
            </div>

          </div>

          <div>

            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" defaultValue={cliente.address.complemento}/>
            <br/><label> Cliente ativo? </label> <br/>
            <select className={styles.inputCurto} id="">
              <option value="">Sim</option>
              <option value="">Não</option>
            </select>
            <div className={styles.buttons}>
              <button type="button"><Link href="/"> Cancelar</Link></button>
              <button className="salvar" type="submit" >Salvar</button>
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
    active: data.active,
    nomeCliente: data.nomeCliente,
    email: data.email,
    dtnasc: data.dt_nasc,
    tcelular: data.tcelular,
    cpf: data.cpf,
    gender: data.gender,
    address: {
      nomeEndereco: data.address.nomeEndereco,
      cep: data.address.cep,
      logradouro: data.address.logradouro,
      numero: data.address.numero,
      cidade: data.address.cidade,
      bairro: data.address.bairro,
      uf: data.address.uf,
      complemento: data.address.complemento
    }
  };

  return {
    props: {
      cliente
    },
    revalidate: 60 * 60 * 24, //24h
  }
}

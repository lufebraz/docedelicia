import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import VMasker from 'vanilla-masker';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { NavMenu } from '../../../components/NavBar';
import SyncLoader from 'react-spinners/SyncLoader';

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
      bairro: string;
      logradouro: string;
      numero: number;
      complemento: string;
      referencia: string;
      ativo: number;
    }
  ]
}

type Endereco = {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}


export default function Cadastrar() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Cliente>();
  const [tel, setTel] = useState('')
  const [cpf, setCpf] = useState('')
  const [cep, setCep] = useState('')
  const [telFixo, setTelFixo] = useState('')
  const [uf, setUf] = useState('DF')
  const [bairro, setBairro] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [endereco, setEndereco] = useState<Endereco>({} as Endereco)
  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    values.tCelular = VMasker.toPattern(values.tCelular, "99999999999")
    values.tFixo = !!values.tFixo ? VMasker.toPattern(values.tFixo, "9999999999") : null
    values.endereco[0].cep = VMasker.toPattern(values.endereco[0].cep, "99999999")
    values.cpf = VMasker.toPattern(values.cpf, "99999999999")
    values.email = !!values.email ? values.email : null
    values.genero = !!values.genero ? values.genero : null
    values.endereco[0].complemento = !!values.endereco[0].complemento ? values.endereco[0].complemento : null
    values.endereco[0].referencia = !!values.endereco[0].referencia ? values.endereco[0].referencia : null
    values.endereco[0].bairro = bairro
    values.endereco[0].logradouro = logradouro
    values.endereco[0].cidade = localidade
    values.endereco[0].estado = uf

    await axios({
      method: 'POST',
      url: 'https://docedelicia.herokuapp.com/api/cliente',
      headers: { 'Cliente': 'dados do cliente' },
      data: values
    })
      .then(function (response) {
        if (response.status === 200) {
          alert('Cliente cadastrado!!');
          Router.push(`/consultar/clientes`)
        }
      })
      .catch(function (response) {
        alert('Cliente não cadastrado! Verificar campos');
      });
    setLoading(false)
  })

  function buscarEndereco() {
    document.getElementById("cep").style.opacity = "0.5";
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => setEndereco(data))
      .catch(function (error) { alert('por favor, insira 8 digitos no cep') })
  }

  useEffect(() => {
    setUf(endereco.uf)
    setLocalidade(endereco.localidade)
    setLogradouro(endereco.logradouro)
    setBairro(endereco.bairro)
  }, [endereco])
  useEffect(() => {
    setTel(VMasker.toPattern(tel, "(99) 99999-9999"))
  }, [tel])
  useEffect(() => {
    setTelFixo(VMasker.toPattern(telFixo, "(99) 9999-9999"))
  }, [telFixo])
  useEffect(() => {
    setCpf(VMasker.toPattern(cpf, "999.999.999-99"))
  }, [cpf]);
  useEffect(() => {
    setCep(VMasker.toPattern(cep, "99999-999"))
  }, [cep])

  return (
    <main>
      <NavMenu />
      <form onSubmit={onSubmit} className={styles.form} >
        <div className={styles.dadosCliente}>
          <div>
            <input type="hidden" value={1} {...register("ativo")} readOnly />
            <h3>Dados do Cliente:</h3>
            <label> Nome*  <br />
              <input name="nomeCliente" placeholder="Jose da Silva"
                required {...register("nome")} /></label> <br />

            <label>e-mail <br />
              <input name="email" type="email"
                placeholder="josesilva@exemplo.com" {...register("email")} /></label><br />

            <label>data de nascimento <br />
              <input className={styles.inputCurto} name="dtNasc"
                type="date" placeholder="dd/mm/aaaa" max="2010-01-01"
                min="1900-01-01" {...register("dtNascimento")} /></label><br />
          </div>
          <div>
            <br />
            <div>
              <label>Telefone celular* <br />
                <input className={styles.inputCurto} name="tcelular"
                  placeholder="(00) 12345-6789" minLength={15}
                  value={tel} {...register("tCelular")}
                  onChange={e => setTel(e.target.value)}
                  autoComplete="off" /><br />
              </label>
              <label>Telefone fixo<br />
                <input className={styles.inputCurto}
                  name="tfixo" placeholder="(00) 1234-5678"
                  value={telFixo} {...register("tFixo")}
                  onChange={e => setTelFixo(e.target.value)}
                  autoComplete="off" /><br />
              </label>
            </div>

            <label>CPF*</label><br />
            <input value={cpf} {...register("cpf")} minLength={14}
              className={styles.inputCurto} required
              placeholder="111.222.333-44" name="cpf"
              onChange={e => setCpf(e.target.value)}
              autoComplete="off" /><br />

            <label>gênero </label><br />
            <select name="genero" className={styles.inputCurto}
              {...register("genero")}>
              <option value="">-</option>
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
            <input type="hidden" value={1}
              {...register("endereco.0.ativo")} readOnly />

            <label> Nome do endereço* <br />
              <input name="nome" placeholder="Casa / Trabalho"
                {...register("endereco.0.nome")} required /></label>
            <div>
              <label> CEP* <br />
                <div className={styles.cep}>
                  <input name="cep" placeholder="12345-678"
                    value={cep} {...register("endereco.0.cep")}
                    minLength={8} onChange={e => setCep(e.target.value)}
                    autoComplete="off" required /> <br />
                  <button onClick={buscarEndereco} type="button" id="cep">🔍</button>
                </div> </label>
              <label> Logradouro* <br />
                <input value={logradouro}{...register("endereco.0.logradouro")}
                  className={styles.inputCurto} required
                  name="logradouro" placeholder="Av. Principal"
                  onChange={e => setLogradouro(e.target.value)} /> <br /></label>
              <label> Num* <br />
                <input className={styles.inputMtCurto} name="numero"
                  placeholder="201" maxLength={6} required
                  {...register("endereco.0.numero")} /> <br /></label>
            </div>
            <div >

              <label >Cidade* <br />
                <input value={localidade}{...register("endereco.0.cidade")}
                  className={styles.inputCurto} name="cidade" placeholder="Brasília"
                  onChange={e => setLocalidade(e.target.value)} required /><br />
              </label>
              <label >Bairro <br />
                <input value={bairro} {...register('endereco.0.bairro')}
                  className={styles.inputCurto} placeholder="Centro"
                  onChange={e => setBairro(e.target.value)} />
              </label>

            </div>
            <div>
              <label >UF* <br />
                <select className={styles.inputCurto} name="estado" value={uf} {...register("endereco.0.estado")}
                  onChange={e => setUf(e.target.value)} required>
                  <option value="">Selecione um Estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                  <option value="EX">Estrangeiro</option>
                </select>
              </label>
            </div>

          </div>

          <div className={styles.complementoo}>

            <br /><label >Complemento</label> <br />
            <input className={styles.complemento} maxLength={40}
              {...register("endereco.0.complemento")} />
            <br /><label >Referência <br />
              <input className={styles.complemento}
                {...register("endereco.0.referencia")} /><br />
            </label >
            <div className={styles.buttons}>
              {loading ? <SyncLoader color="#4979FF" size="11" /> :
                <>
                  <button type="submit" >Salvar</button>
                  <Link href="/"><button>Cancelar</button></Link>
                </>
              }
            </div>

          </div>

        </div>
      </form>
    </main>
  )
}
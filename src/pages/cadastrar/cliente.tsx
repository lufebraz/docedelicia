import { useEffect, useState } from 'react';
import VMasker from 'vanilla-masker';
import { NavMenu } from '../../components/NavBar';
import styles from './styles.module.scss';

interface Endereco {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}



export default function Cadastrar() {
  // Auto incrementando endereço ao colocar o cep
  const [cep, setCep] = useState('71691019');
  const [endereco, setEndereco] = useState<Endereco>({} as Endereco);
  useEffect(() => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => setEndereco(data))
  }, [cep]);

  // Mascarando campos telefone, cpf, cep
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
      <NavMenu />
      <form action="http://localhost:3333/clients" className={styles.form} method="post">
        <div className={styles.dadosCliente}>
          <div>
            <h3>Dados do Cliente:</h3>
            <label> Nome:  </label><br />
            <input name="nomeCliente" placeholder="Jose da Silva" required /> <br />

            <label>e-mail: </label><br />
            <input name="email" type="email" placeholder="josesilva@exemplo.com" required /><br />

            <label>data de nascimento:</label> <br />
            <input className={styles.inputCurto} name="dtNasc" type="date" placeholder="dd/mm/aaaa" max="2003-12-31" /><br />
          </div>


          <div>
            <br />
            <div>
              <label>Telefone celular:  <br />
                <input className={styles.inputCurto} name="tcelular" placeholder="(00) 12345-6789" onChange={e => setTel(e.target.value)} value={tel} required /><br />
              </label>
              <label>Telefone fixo:<br />
                <input className={styles.inputCurto} name="tfixo" placeholder="(00) 1234-5678" onChange={e => setTelfixo(e.target.value)} value={telfixo} /><br />
              </label>
            </div>

            <label>CPF: </label><br />
            <input className={styles.inputCurto} name="cpf" placeholder="123.456.789-12" required onChange={e => setCpf(e.target.value)} value={cpf} /><br />

            <label>gênero: </label><br />
            <select name="genero" className={styles.inputCurto}>
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
            <input  name="nomeEndereco" placeholder="Casa / Trabalho" /> <br />

            <div>

              <label> Logradouro: <br />
                <input className={styles.inputCurto} name="logradouro" placeholder="Av. Principal" value={endereco.logradouro} /> <br />
              </label>
              <label> CEP: <br />
                <input className={styles.tamanhoMedio} name="cep" placeholder="12345-678" onChange={e => setCep1(e.target.value)} value={cep1} /> <br />
              </label>
              <label> Num: <br />
                <input className={styles.inputMtCurto} name="numero" placeholder="201" maxLength={10} /> <br />
              </label>
            </div>
            {/* onBlur={e => setCep(e.target.value)} */}


            <div >
              <label >Cidade: <br />
                <input className={styles.inputCurto} name="cidade" placeholder="Brasília" value={endereco.localidade} /><br />
              </label>
              <label >Bairro: <br />
                <input className={styles.tamanhoMedio} name="bairro" placeholder="Asa Norte" value={endereco.bairro} /><br />
              </label >
              <label >UF: <br />
                <input className={styles.inputMtCurto} name="uf" placeholder="DF" maxLength={2} value={endereco.uf} />
              </label>
            </div>

          </div>

          <div>

            <br /><label >Complemento:</label> <br />
            <input className={styles.complemento} name="complemento" />

            <div className={styles.buttons}>
              <button>Cancelar</button>
              <button className="salvar" type="submit" >Salvar</button>
            </div>

          </div>

        </div>
      </form>
    </main>
  )
}
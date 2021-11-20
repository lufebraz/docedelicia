import styles from './styles.module.scss'

export default function Modal(props) {
  
  return (
    <>
      <div className={props.show ? styles.container : styles.dontShow} onClick={props.clicked}>

        <h3>{props.header}</h3>

        { 
          props.tipoListagem ? props.data.map(cliente => {
            return (
              <div key={cliente.id} className={styles.lista} onClick={() => props.setData(cliente.id)}>
                <p >nome: {cliente.nome}</p>
                <p> cpf:  {cliente.cpf}</p>
              </div>
            )
          })
            :
            props.data.map(produto => {
              return (
                <div key={produto.id} className={styles.lista} onClick={() => props.setData(produto.id)}>
                  <p >nome: {produto.nome}</p>
                  <p >preço: {produto.preco}</p>
                </div>
              )
            })

        }
      </div>
      <div className={props.show ? styles.backdrop : styles.dontShow} onClick={props.clicked}></div>
    </>
  )

}

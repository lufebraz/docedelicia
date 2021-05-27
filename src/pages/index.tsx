import Link from 'next/link';
import styles from './home.module.scss'

export default function Home() {
  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="">BOLOS</Link></li>
          <li><Link href="">TORTAS</Link></li>
          <li><Link href="">SALGADOS</Link></li>
          <li><Link href="">KIT FESTA</Link></li>
        </ul>
      </nav>


      <main className={styles.main}>
        <div className={styles.imagens}>
          <img src="/image3.png" alt="" />
          <img src="/image4.png" alt="" />
          <img src="/image5.png" alt="" />
          <img src="/image7.png" alt="" />
        </div>
        <div className={styles.mapa}>
          <h1>Ache nossa loja:</h1>
          <iframe title="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21709.28615634127!2d-48.03217301382333!
          3d-15.87257432051151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdc9d7042731a489!2sDoce%20De
          l%C3%ADcia!5e0!3m2!1sen!2sbr!4v1617651342070!5m2!1sen!2sbr" loading="lazy" />
        </div>
      </main>

      <footer className={styles.footer}>
        <div>
          <div className={styles.divisor}>
            
            <div className={styles.logo}>
              <img src="/logo.svg" alt="" />
            </div>
            
            <div>
              <ul>Sobre:
                <li>História da Doce Delícia</li>
                <li>Trabalhe conosco</li>
              </ul>
            </div>
            <div>
              <ul>Links rápidos:
                <li><a href="https://www.instagram.com/docedeliciabrasilia/" target="blank">Instagram</a></li>
                <li><a href="https://www.facebook.com/docedeliciabsb" target="blank">Facebook</a></li>
              </ul>
            </div>
            <div>
              <p>Endereço: CLN 5 Bloco B Lote 3/4 Loja 4 - Riacho Fundo I, Brasília - DF, CEP: 71805-522</p>
              <p>Telefones para contato: <br />(61) 3536-5121 </p><p className={styles.contato}> <Link href="https://api.whatsapp.com/message/B4TLWVC75EIRL1">(61) 99247-6273</Link></p>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.creditos}>
          <p>© 2021 - Todos direitos reservados à Doce Delicia</p>
          <p>Desenvolvido por Luiz Fernando </p>
        </div>
      </footer>
    </div>
  )
}

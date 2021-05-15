import Document, { Html, Head, Main, NextScript } from 'next/Document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />          
          <title>Doce Delicia | Confeitaria Artesanal</title>
          <link rel="shortcut icon" href="/logo.svg" type="image/x-icon"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
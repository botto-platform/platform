import Document, { Head, Main, NextScript } from "next/document"

import stylesheet from "../styles/index.css"

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    return { html, head, errorHtml, chunks }
  }

  render() {
    console.log(this.props.customValue)

    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* <link rel="stylesheet" href="/static/css/bundle.css" /> */}
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <script src="https://js.stripe.com/v3/" />
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument

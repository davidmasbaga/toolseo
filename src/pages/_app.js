import '@/styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from '@/components/ui/Layout'

export default function App({ Component, pageProps }) {
  return(
  <Layout>
   <Component {...pageProps} />
   </Layout>
   )
}

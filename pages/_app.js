import HeaderNav from '../components/HeaderNav/'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <>
    <HeaderNav/>
    <Component {...pageProps} />
  </>)
}

import '../styles/globals.css'
import { useState } from "react";
import { MainLayout } from '../components/Layout/MainLayout';

function MyApp({ Component, pageProps }) {


  const [basket, setBasket] = useState([])
  const [currency, setCurrency] = useState([])
  const [visibl, setVisibl] = useState(false)
  const [text, setText] = useState('')

  return (
    <MainLayout basket={basket} 
    visibl={visibl} setVisibl={setVisibl} 
    text={text} 
    currency={currency} setCurrency={setCurrency}>
      <Component {...pageProps}  
      basket={basket} setBasket={setBasket} 
      visibl={visibl} setVisibl={setVisibl}
      text={text} setText={setText} currency={currency} 
      />
    </MainLayout>
  )

}

export default MyApp

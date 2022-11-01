import '../styles/globals.css'
import { useState } from "react";
import { MainLayout } from '../components/MainLayout';

function MyApp({ Component, pageProps }) {


  const [basket, setBasket] = useState([])


  return (
    <MainLayout basket={basket} >
      <Component {...pageProps}  basket={basket} setBasket={setBasket}/>
    </MainLayout>
  )

}

export default MyApp

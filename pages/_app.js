import '../styles/globals.css'
import { useState } from "react";
import { MainLayout } from '../components/MainLayout';

function MyApp({ Component, pageProps }) {


  const [basket, setBasket] = useState([])
  const [visibl, setVisibl] = useState(false)
  const [text, setText] = useState('')

  return (
    <MainLayout basket={basket} visibl={visibl} setVisibl={setVisibl} text={text}>
      <Component {...pageProps}  
      basket={basket} setBasket={setBasket} 
      visibl={visibl} setVisibl={setVisibl}
      text={text} setText={setText}
      />
    </MainLayout>
  )

}

export default MyApp

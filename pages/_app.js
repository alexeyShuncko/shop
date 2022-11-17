import '../styles/globals.css'
import { useState } from 'react'
import { MainLayout } from '../components/Layout/MainLayout'

function MyApp({ Component, pageProps }) {

  const [scroll, setScroll] = useState(0)

  const [basket, setBasket] = useState([])
  const [currency, setCurrency] = useState('USD')
  const [visibl, setVisibl] = useState(false)
  const [text, setText] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('без сортировки')

  return (
    <MainLayout basket={basket}
      visibl={visibl} setVisibl={setVisibl}
      text={text} setText={setText}
      currency={currency} setCurrency={setCurrency}
      category={category} setCategory={setCategory}
      scroll={scroll} setScroll={setScroll}>
      <Component {...pageProps}
        basket={basket} setBasket={setBasket}
        visibl={visibl} setVisibl={setVisibl}
        text={text} setText={setText} currency={currency}
        category={category} setCategory={setCategory}
        sort={sort} setSort={setSort}
      />
    </MainLayout>
  )
}

export default MyApp

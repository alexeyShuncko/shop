import Image from 'next/image'
import s from '../styles/Catalog.module.css'
import { useState, useEffect, useLayoutEffect } from 'react'
import { Loading } from '../components/Loading'
import { useRouter } from 'next/router'
import { MySelect } from '../components/MySelect'
import VanillaTilt from 'vanilla-tilt'




export default function Catalog(
  { data: serverData, basket, setBasket, setVisibl, setText, currency,
    category, setCategory, sort, setSort }) {

  const [data, setData] = useState(serverData)
  const [products, setProducts] = useState(data)
  const [value, setValue] = useState('')


  const router = useRouter()

  const clickBasketHandler = (e) => {

    e.stopPropagation()

    if (e.target.innerHTML === 'Удалить') {
      setBasket(basket.filter(el => el.id !== Number(e.target.dataset.id)))
      setText('Товар удалён из корзины!')
      setVisibl(true)
    }
    else {
      const product = products.find(el => el.id === Number(e.target.dataset.id))
      product.amount = 1
      setBasket([...basket, product])
      setText('Товар добавлен в корзину!')
      setVisibl(true)
    }
  }

  const searchChangeHandler = (e) => {
    setValue(e.target.value)
  }


  const sortingHelper = (arr = [], option) => {
    if (option === 'по возрастанию') {
      return arr.sort((a, b) => a.price - b.price)
    }
    else if (option === 'по убыванию') {
      return arr.sort((a, b) => b.price - a.price)
    }
    else return arr.sort((a, b) => a.id - b.id)
  }


   useEffect(()=> {
    if (document.documentElement.clientWidth > 900) {
      
      const listElement = document && document.querySelectorAll(`[data-el='card']`)
      VanillaTilt.init(listElement)
    }
   },[products])

  useEffect(() => {
  
    async function load() {
      const response = await fetch('https://fakestoreapi.com/products')
      const dataProducts = await response.json()
      setData(dataProducts)
      setProducts(dataProducts)
     
    }
    if (!data) {
      load()
    }
  }, [data])

useLayoutEffect(() => {
      if (category === 'all' && data) {
        setProducts(
          sortingHelper(data.filter(el => el.title.toLowerCase().includes(value.toLowerCase())), sort)
        )
      }
      else
        setProducts(data && sortingHelper(data
          .filter(el => el.category === category)
          .filter(el => el.title.toLowerCase().includes(value.toLowerCase())), sort))
  
    }, [category, data, value, sort])


  if (!data) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.filter}>
        <div >
          <input placeholder='Поиск ...' value={value} onChange={searchChangeHandler}></input>
        </div>
        <div className={s.filterGroupItem}>
          <div className={s.filterItem}>
            <span>Сортировка цены: </span>
            <MySelect value={sort} setValue={setSort}
              dataList={['по возрастанию', 'по убыванию', 'без сортировки']} />
          </div>
          <div className={s.filterItem}>
            <span>Категория: </span>
            <MySelect value={category} setValue={setCategory}
              dataList={['all', `men's clothing`, 'jewelery', 'electronics', `women's clothing`]} />
          </div>
        </div>
      </div>
      <div className={s.catalog}>
        {products.length !== 0

          ? products.map(el => (
            <div  key={el.title} data-el='card'
            className={s.card} onClick={() => router.push(`./product/${el.id}`)}>
              <div className={s.title}>{el.title}</div>
              <div style={{ height: '221px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Image
                  src={`${el.image}`}
                  alt=''
                  width={100}
                  height={100}
                  priority
                  style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div style={{ marginTop: '20px' }}>
                {
                  currency === 'BYN'
                    ? <div className={s.price}>{(el.price * 2.5).toFixed(2)} Br</div>
                    : <div className={s.price}>{el.price.toFixed(2)} $</div>
                }
                {
                  basket.find(a => a.id === el.id)
                    ? <button
                      className='btn remove'
                      onClick={clickBasketHandler}
                      data-id={el.id}>Удалить</button>
                    : <button
                      className='btn success'
                      onClick={clickBasketHandler}
                      data-id={el.id}>Добавить</button>
                }
              </div>
            </div>
          ))
          : <div>Ничего не найдено ...</div>
        }
      </div>
    </div>
  )
}

Catalog.getInitialProps = async ({ req }) => {
  if (!req) {
    return { data: null }
  }

  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return {
    data
  }
}
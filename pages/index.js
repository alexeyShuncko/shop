import Image from 'next/image'
import s from '../styles/Catalog.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Loading } from '../components/Loading'
import { useRouter } from 'next/router'





export default function Catalog({ data:serverData, basket, setBasket, setVisibl, setText, currency }) {

  const [category, setCategory] = useState('all')
  const [data, setData] = useState(serverData)
  const [products, setProducts] = useState(data)
  const [value, setValue] = useState('')

  const router = useRouter()


  const clickBasketHandler = (e) => {
    e.stopPropagation()

    const body = document.querySelector('body')
    body.style.pointerEvents ='none'
    
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

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
    if (e.target.value === 'all') {
      setProducts(data)
    }
    else
    setProducts(data.filter(el => el.category === e.target.value))
  }

  const searchChangeHandler = (e) => {
    
    setValue(e.target.value)
    if (e.target.value === '') {
      setProducts(category === 'all' ? data : data.filter(el => el.category === category))
    }
    else 
    setProducts(category === 'all' 
    ? data.filter(el=> el.title.toLowerCase().includes(e.target.value.toLowerCase())) 
    : data
    .filter(el => el.category === category)
    .filter(el=> el.title.toLowerCase().includes(e.target.value.toLowerCase())))
  }


  useEffect(()=> {
  async function load () {
    const response = await fetch('https://fakestoreapi.com/products')
    const dataProducts = await response.json()
    setData(dataProducts)
    setProducts(dataProducts)
    
  }
  if (!data) {
    load()
  }
  },[data])



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
        <div>
          <span>Категория: </span>
          <select value={category} onChange={categoryChangeHandler}>
            <option>all</option>
            <option>{`men's clothing`}</option>
            <option>jewelery</option>
            <option>electronics</option>
            <option>{`women's clothing`}</option>
          </select>
        </div>
      </div>
      <div className={s.catalog}>
        {products.length !== 0 

        ? products.map(el => (
            <div key={el.title} className={s.card} onClick={()=> router.push(`./product/${el.id}`)}>
              <div className={s.title}>{el.title}</div>
              <div>
                <Image
                  src={`${el.image}`}
                  alt=''
                  width={100}
                  height={130}
                  priority
                  style={{ width: 'auto', height: 'auto' }} />
              </div>
              
                {
                  currency === 'BYN' 
                  ? <div className={s.price}>{(el.price*2.5).toFixed(2)} Br</div>
                  : <div className={s.price}>{el.price} $</div>
                }
                
               
              <div style={{marginTop: '20px'}}>
                {
                  basket.find(a => a.id === el.id)
                    ? <button className='btn' onClick={clickBasketHandler}
                      data-id={el.id} style={{ '--clr': '#e26868' }}>Удалить</button>
                    : <button className='btn' onClick={clickBasketHandler}
                      data-id={el.id} style={{ '--clr': '#2ECC71' }}>Добавить</button>
                }

                {/* <Link className='btn' style={{ '--clr': '#dd57a5' }}
                  href={`/product/[id]`} as={`/product/${el.id}`}
                >Подробнее</Link> */}
              </div>
            </div>
          ))

          : <div>Ничего не найдено ...</div>
        }
      </div>
     
    </div>
  )
}


Catalog.getInitialProps = async ({req}) => {
  if (!req) {
    return {data: null}
  }

  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return {
    data
  }
}
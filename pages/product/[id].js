import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Loading } from "../../components/Loading";
import s from '../../styles/Product.module.css'

export default function Product({ data: serverData, basket, setBasket, setVisibl, setText, currency }) {

  const [data, setData] = useState(serverData)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`https://fakestoreapi.com/products/${router.query.id}`)
      const product = await response.json()
      setData(product)
    }
    if (!serverData) {
      load()
    }
  }, [serverData, router])

  if (!data) {
    return (
      <Loading />
    )
  }

  const clickBasketHandler = (e) => {
    const body = document.querySelector('body')
    body.style.pointerEvents ='none'
    if (e.target.innerHTML === 'Удалить') {
      setBasket(basket.filter(el => el.id !== Number(e.target.dataset.id)))
      setText('Товар удалён из корзины!')
      setVisibl(true)
    }
    else {
      data.amount = 1
      setBasket([...basket, data])
      setText('Товар добавлен в корзину!')
      setVisibl(true)
    }
  }

  return (
    <>
      <div className={s.title}>{data.title}</div>
      <div className={s.content}>
        <Image src={data.image} width={200} height={250} alt='' priority style={{ width: 'auto', height: 'auto' }} />
        <div>
          <div className={s.description}>{data.description}</div>
          <div className={s.list}><span>Категория:</span><span className={s.bold}>{data.category}</span></div>
          <div className={s.list}><span>Рейтинг:</span>
          <span className={s.rating} style={{'--rating': data.rating.rate}} 
          aria-label={`Rating of this product is ${data.rating.rate} out of 5.`}></span>
          </div>
          <div className={s.list}><span>Цена:</span>
          {
            currency === 'BYN'
            ? <span className={s.bold}>{(data.price*2.5).toFixed(2)} Br</span>
            : <span className={s.bold}>{data.price} $</span>
          }
          </div>
          <div style={{ marginTop: '20px' }}>
            {
              basket.find(a => a.id === data.id)
                ? <button className='btn remove' onClick={clickBasketHandler}
                  data-id={data.id} >Удалить</button>
                : <button className='btn success' onClick={clickBasketHandler}
                  data-id={data.id} >Добавить</button>
            }
            <Link href={'/'} className='btn normal'>В каталог</Link>
          </div>
        </div>
      </div>
    </>
  )
}



Product.getInitialProps = async ({ query, req, res }) => {
  if (!req) {
    return { data: null }
  }
  
  const response = await fetch(`https://fakestoreapi.com/products/${query.id}`)
  const data = await response.json()
  
  return {
    data
  }
}
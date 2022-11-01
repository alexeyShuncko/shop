import Image from 'next/image'
import s from '../styles/Catalog.module.css'
import Link from 'next/link'
import { useState } from 'react'





export default function Catalog({ data, basket, setBasket }) {

  const [category, setCategory] = useState('all')
  const [products, setProducts] = useState(data)
  const [value, setValue] = useState('')



  const clickBasketHandler = (e) => {
    if (e.target.innerHTML === 'Удалить') {
      setBasket(basket.filter(el => el.id !== Number(e.target.dataset.id)))
    }
    else {
      setBasket([...basket, data.find(el => el.id === Number(e.target.dataset.id))])
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
      setProducts(data)
    }
    else 
    setProducts(products.filter(el=> el.title.includes(e.target.value)))
  }

  return (
    <>
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
            <div key={el.title} className={s.card}>
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
              <div className={s.price}>{el.price}$</div>
              <div>
                {
                  basket.find(a => a.id === el.id)
                    ? <button className='btn' onClick={clickBasketHandler}
                      data-id={el.id} style={{ '--clr': '#e26868' }}>Удалить</button>
                    : <button className='btn' onClick={clickBasketHandler}
                      data-id={el.id} style={{ '--clr': '#2ECC71' }}>Добавить</button>
                }

                <Link className='btn' style={{ '--clr': '#dd57a5' }}
                  href={`/product/[id]`} as={`/product/${el.id}`}
                >Подробнее</Link>
              </div>
            </div>
          ))

          : <div>Ничего не найдено ...</div>
        }
      </div>
    </>
  )
}


Catalog.getInitialProps = async () => {

  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return {
    data
  }
}
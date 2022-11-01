import Image from 'next/image'
import s from '../styles/Catalog.module.css'
import Link from 'next/link'





export default function Catalog({ data, basket, setBasket }) {

  const clickBasketHandler = (e) => {

    if (e.target.innerHTML === 'Удалить') {
      setBasket(basket.filter(el => el.id !== Number(e.target.dataset.id)))
    }
    else {
      setBasket([...basket, data.find(el => el.id === Number(e.target.dataset.id))])
    }


  }

  console.log(basket);

  return (
    <>
      <div>
        Online store
      </div>
      <div className={s.catalog}>
        {data.length !== 0 &&
          data.map(el => (
            <div key={el.title} className={s.card}>
              <div>{el.title}</div>
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
                    ? <button className={s.btn} onClick={clickBasketHandler}
                      data-id={el.id} style={{ background: '#e26868' }}>Удалить</button>
                    : <button className={s.btn} onClick={clickBasketHandler}
                      data-id={el.id} >Добавить</button>
                }

                <Link className={s.btn} href={`/product/[id]`} as={`/product/${el.id}`}>Подробнее</Link>
              </div>
            </div>
          ))
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
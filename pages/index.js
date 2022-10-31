import { MainLayout } from '../components/MainLayout'
import Image from 'next/image'
import s from '../styles/Catalog.module.css'

export default function Catalog({data}) {

  return (
    <MainLayout>
      <div>
      Online store
      </div>
      <div className={s.catalog}>
      {data.length !== 0 &&
        data.map(el => (
          <div key={el.title} className={s.card}>
            <div>{el.title}</div>
            <div><Image src={`${el.image}`} alt='' width={100} height={130} priority/></div>
            <div className={s.price}>{el.price}$</div>
            <div>
            <button className={s.btn}>В корзину</button>
            <button className={s.btn}>Подробнее</button>
            </div>
          </div>
        ))
      }
      </div>
    </MainLayout>
  )
}


Catalog.getInitialProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return {
    data
  }
}
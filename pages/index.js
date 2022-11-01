import { MainLayout } from '../components/MainLayout'
import Image from 'next/image'
import s from '../styles/Catalog.module.css'
import Link from 'next/link'

export default function Catalog({ data }) {



  return (
    <MainLayout>
      <div>
        Online store
      </div>
      <div className={s.catalog}>
        {data.length !== 0 &&
          data.map(el => (
            <div key={el.id} className={s.card}>
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
                <Link className={s.btn} href={'/basket'}>Добавить</Link>
                <Link className={s.btn} href={`/product/[id]`} as={`/product/${el.id}`}>Подробнее</Link>
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
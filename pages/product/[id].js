import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "../../components/MainLayout";
import s from '../../styles/Product.module.css'

export default function Product({ data }) {

  return (
    <MainLayout>
      <div className={s.tittle}>{data.title}</div>
      <div className={s.content}>
        <Image src={data.image} width={200}  height={250} alt='' priority style={{width: 'auto', height: 'auto'}}/>
        <div>
          <div className={s.description}>{data.description}</div> 
          <div className={s.list}><span>Категория:</span><span>{data.category}</span></div>
          <div className={s.list}><span>Рейтинг:</span><span>{data.rating.rate}</span></div>
          <div className={s.list}><span>Цена:</span><span className={s.bold}>{data.price}$</span></div>
          <div>
            <Link href={'/'} className={s.btn}>В каталог</Link>
            <Link href={'/'} className={s.btn}>Добавить</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}



Product.getInitialProps = async (ctx) => {
  const response = await fetch(`https://fakestoreapi.com/products/${ctx.query.id}`)
  const data = await response.json()
  return {
    data
  }
}
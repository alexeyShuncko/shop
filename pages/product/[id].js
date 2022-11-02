import Image from "next/image";
import Link from "next/link";
import s from '../../styles/Product.module.css'

export default function Product({ data, basket, setBasket, setVisibl, setText }) {

  const clickBasketHandler = (e) => {
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
      <div className={s.tittle}>{data.title}</div>
      <div className={s.content}>
        <Image src={data.image} width={200}  height={250} alt='' priority style={{width: 'auto', height: 'auto'}}/>
        <div>
          <div className={s.description}>{data.description}</div> 
          <div className={s.list}><span>Категория:</span><span>{data.category}</span></div>
          <div className={s.list}><span>Рейтинг:</span><span>{data.rating.rate}</span></div>
          <div className={s.list}><span>Цена:</span><span className={s.bold}>{data.price}$</span></div>
          <div style={{marginTop: '20px'}}>
          {
                  basket.find(a => a.id === data.id)
                    ? <button className='btn'  onClick={clickBasketHandler}
                      data-id={data.id} style={{ '--clr': '#e26868' }}>Удалить</button>
                    : <button className='btn' style={{ '--clr': '#2ECC71' }} onClick={clickBasketHandler}
                      data-id={data.id} >Добавить</button>
                }
            <Link href={'/'} className='btn' style={{ '--clr': '#dd57a5' }}>В каталог</Link>
          </div>
        </div>
      </div>
    </>
  )
}



Product.getInitialProps = async (ctx) => {
  const response = await fetch(`https://fakestoreapi.com/products/${ctx.query.id}`)
  const data = await response.json()
  return {
    data
  }
}
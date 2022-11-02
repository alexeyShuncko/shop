import Image from 'next/image'
import Link from 'next/link'
import s from '../styles/Basket.module.css'

export default function Basket({ basket = [], setBasket }) {


  const clickBasketHandler = (e) => setBasket(basket.filter(el => el.id !== Number(e.target.dataset.id)))

  if (basket.length === 0) {
    return (
      <div className={s.message}>
        <div >Корзина пока пуста.</div>
        <Link className='btn' style={{ '--clr': '#dd57a5' }} href={'/'}>За покупкам!</Link>
      </div>
    )
  }




  return (
    <>
      {basket.map(el => (
        <div key={el.id} className={s.product}>
          <Image
            src={`${el.image}`}
            alt=''
            width={50}
            height={70}
            priority
            style={{ width: 'auto', height: 'auto', }} />

          <div className={s.title}>{el.title}</div>
          <div className={s.price}>
            <div className={s.amountBlock}>
              {
                el.amount > 1 
                ? <button onClick={()=> {
                  el.amount = el.amount - 1
                  setBasket([...basket])
                }}>-</button>
                : <button onClick={()=> {
                  el.amount = el.amount - 1
                  setBasket([...basket])
                }} disabled>-</button>
              }
              
              <span className={s.amount}>{el.amount}</span>

              {
                 el.amount < 99 
                 ? <button onClick={()=> {
                  el.amount = el.amount + 1
                  setBasket([...basket])
                }}>+</button>
                : <button onClick={()=> {
                  el.amount = el.amount + 1
                  setBasket([...basket])
                }} disabled>+</button>
              }
             
            </div>
            <span>{(el.price * el.amount).toFixed(2)}$</span>
            <button className='btn' onClick={clickBasketHandler}
              data-id={el.id} style={{ '--clr': '#e26868' }}>Удалить</button>
          </div>
        </div>
      ))
      }
      <div className={s.summ}>
        <span>Всего товаров: {basket.map(el => el.amount).reduce((acc, sum)=> acc + sum, 0)}шт.</span>
        <span>Итого: {basket.map(el => el.price * el.amount).reduce((acc, sum) => acc + sum, 0).toFixed(2)}$</span>
      </div>
      <div>
        <Link className='btn' style={{ '--clr': '#dd57a5' }} href={'/'}>За покупками!</Link>
        <Link className='btn' style={{ '--clr': '#2ECC71' }} href={'/payment'}>К оплате.</Link>
      </div>
    </>
  )
}

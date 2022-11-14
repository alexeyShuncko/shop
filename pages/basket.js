import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import s from '../styles/Basket.module.css'

export default function Basket({ basket = [], setBasket, setVisibl, setText, currency }) {


  const router = useRouter()

  const clickBasketHandler = (e) => {
    const body = document.querySelector('body')
    body.style.pointerEvents ='none'
    e.stopPropagation()
    setBasket(basket.filter(el => el.id !== Number(e.target.dataset.id)))
    setText('Товар удалён из корзины!')
    setVisibl(true)
  }

  if (basket.length === 0) {
    return (
      <div className={s.message}>
        <div >Корзина пока пуста.</div>
        <Link className='btn normal'  href={'/'}>За покупкам!</Link>
      </div>
    )
  }




  return (
    <>
      {basket.map(el => (
        <div key={el.id} className={s.product}  onClick={()=> router.push(`/product/${el.id}`)}>
          <Image
            src={`${el.image}`}
            alt=''
            width={50}
            height={70}
            priority
            style={{ width: 'auto', height: 'auto', }} />

          <div className={s.title}>{el.title}</div>
          <div className={s.price} onClick={(e)=> e.stopPropagation()} style={{height: '100%', cursor: 'auto'}}>
            <div className={s.amountBlock}>
              {
                el.amount > 1 
                ? <button onClick={(e)=> {
                  e.stopPropagation()
                  el.amount = el.amount - 1
                  setBasket([...basket])
                }}>-</button>
                : <button onClick={(e)=> {
                  e.stopPropagation()
                  el.amount = el.amount - 1
                  setBasket([...basket])
                }} disabled style={{cursor: 'not-allowed'}}>-</button>
              }
              
              <span className={s.amount}>{el.amount}</span>

              {
                 el.amount < 10 
                 ? <button onClick={(e)=> {
                  e.stopPropagation()
                  el.amount = el.amount + 1
                  setBasket([...basket])
                }}>+</button>
                : <button onClick={(e)=> {
                  e.stopPropagation()
                  el.amount = el.amount + 1
                  setBasket([...basket])
                }} disabled style={{cursor: 'not-allowed'}}>+</button>
              }
             
            </div>
            {
              currency === 'BYN'
              ?  <span>{(el.price * el.amount*2.5).toFixed(2)} Br</span>
              :  <span>{(el.price * el.amount).toFixed(2)} $</span>
            }
           
            <button className='btn remove' onClick={clickBasketHandler}
              data-id={el.id} >Удалить</button>
          </div>
        </div>
      ))
      }
      <div className={s.summ}>
        <span>Всего товаров: {basket.map(el => el.amount).reduce((acc, sum)=> acc + sum, 0)}шт.</span>
        {
          currency === 'BYN'
          ?  <span>Итого: {basket
            .map(el => el.price * el.amount * 2.5)
            .reduce((acc, sum) => acc + sum, 0).toFixed(2)} Br</span>
          :  <span>Итого: {basket
            .map(el => el.price * el.amount)
            .reduce((acc, sum) => acc + sum, 0).toFixed(2)} $</span>
        }
      </div>
      <div>
        <Link className='btn normal'  href={'/'}>За покупками!</Link>
        <Link className='btn success'  href={'/payment'}>К оплате.</Link>
      </div>
    </>
  )
}

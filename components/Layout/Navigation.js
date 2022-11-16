import Image from 'next/image'
import Link from 'next/link'
import { SelectCurrency } from './SelectCurrency'
import basketLogo from '../../public/basket.png'
import s from '../../styles/Layout.module.css'



export const Navigation =({currency,setCurrency,setText,setVisibl,basket })=> {
    return (
        <nav className={s.navigation} >
                <div>
                <SelectCurrency 
                currency={currency} setCurrency={setCurrency} 
                setText={setText} setVisibl={setVisibl}/>
                <Link href={'/'} className={s.active}>Каталог</Link>
                </div>
                <span className={s.nameShop}>Интернет-магазин</span>  
                <Link href={'/basket'} >
                    <div className={s.basket}>
                    { basket.length !==0 && <span className={s.count}>
                        {basket.map(el => el.amount).reduce((acc, sum)=> acc + sum, 0)}</span> }
                    Корзина 
                    <Image src={basketLogo} alt='Корзина' width={30} height={30}/> 
                    </div>
                   </Link>
            </nav>
    )
}
import Head from "next/head"
import Link from "next/link"
import s from '../../styles/Layout.module.css'
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { MyModal } from "../MyModal";
import { SelectCurrency } from "./SelectCurrency";
import { Footer } from "./Footer";



export const MainLayout = (
    { children, basket, visibl, setVisibl, text, setText, currency, setCurrency, category,setCategory}) => {

    const router = useRouter()

    useEffect(()=> {
        let list = document.querySelectorAll('a')
        if (router.pathname.length > 3 && router.pathname.length < 8) {
            list.forEach(el => el.classList.remove(s.active))
            list[1].classList.add(s.active)
        }
        else  {
            list.forEach(el => el.classList.remove(s.active))
            list[0].classList.add(s.active)
        }
    },[router])
    



    return (
        <>
            <Head>
                <title>Shop</title>
            </Head>
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
                    { basket.length !==0 && <span className={s.count}>{basket.length}</span> }
                    Корзина
                    </div>
                   </Link>
            </nav>
            <main className={s.container}>
               {children}
            </main>
          <Footer category={category} setCategory={setCategory}/>
            <MyModal text={text} setVisibl={setVisibl} visibl={visibl} />
        </>
    )
}
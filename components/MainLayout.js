import Head from "next/head"
import Link from "next/link"
import s from '../styles/Layout.module.css'
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { MyModal } from "./MyModal";



export const MainLayout = ({ children, basket, visibl, setVisibl, text}) => {

    const router = useRouter()

    useEffect(()=> {
        let list = document.querySelectorAll('a')
        if (router.pathname.length > 3) {
            list.forEach(el => el.classList.remove(s.active))
            list[1].classList.add(s.active)
        }
        else  {
            list.forEach(el => el.classList.remove(s.active))
            list[0].classList.add(s.active)
        }
    },[router])
    



    return (
        <div style={{position: 'relative'}}>
            <Head>
                <title>Shop</title>
            </Head>
            <nav className={s.navigation} >
                <Link href={'/'} >Каталог</Link>
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
            <MyModal text={text} visibl={visibl} setVisibl={setVisibl}/>
        </div>
    )
}
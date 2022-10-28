import Head from "next/head"
import Link from "next/link"
import s from '../styles/Layout.module.css'


export const MainLayout = ({ children }) => {

    const clickHandler =(e)=> {
        if (e.target.localName === 'a') {
            let list =  e.currentTarget.querySelectorAll('a') 
            list.forEach(el => el.classList.remove(s.active))
            e.target.classList.toggle(s.active)
        }  
    }

    return (
        <>
            <Head>
                <title>Shop</title>
            </Head>
            <nav className={s.navigation} onClick={clickHandler}>
                <Link href={'/'} className={s.active} >Главная</Link>
                <Link href={'/basket'}>Корзина</Link>
            </nav>
            <main className={s.container}>
                {children}
            </main>
        </>
    )
}
import Head from "next/head"
import Link from "next/link"
import s from '../styles/Layout.module.css'





export const MainLayout = ({ children, basket}) => {


    return (
        <>
            <Head>
                <title>Shop</title>
            </Head>
            <nav className={s.navigation} >
                <Link href={'/'} >Каталог</Link>
                <Link href={'/basket'} className={s.basket} data-count={basket.length}>
                    { basket.length !==0 && <span className={s.count}>{basket.length}</span> }
                    Корзина</Link>
            </nav>
            <main className={s.container}>
               {children}
            </main>
        </>
    )
}
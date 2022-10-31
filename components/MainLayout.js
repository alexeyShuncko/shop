import Head from "next/head"
import Link from "next/link"
import s from '../styles/Layout.module.css'





export const MainLayout = ({ children }) => {


    let count = 5

    return (
        <>
            <Head>
                <title>Shop</title>
            </Head>
            <nav className={s.navigation} >
                <Link href={'/'} >Каталог</Link>
                <Link href={'/basket'} className={s.basket} data-count={count} >Корзина</Link>
            </nav>
            <main className={s.container}>
                {children}
            </main>
        </>
    )
}
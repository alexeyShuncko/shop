import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import s from '../styles/Layout.module.css'


export const MainLayout = ({ children }) => {

    const router = useRouter()

    const clickHandler =()=> {
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Shop</title>
            </Head>
            <nav className={s.navigation}>
                <span onClick={clickHandler}>Online store</span>
                <Link href={'/basket'}>Корзина</Link>
            </nav>
            <main className={s.container}>
                {children}
            </main>
        </>
    )
}
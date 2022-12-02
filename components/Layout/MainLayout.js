import Head from 'next/head';
import s from '../../styles/Layout.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MyModal } from '../MyModal';
import { Footer } from './Footer';
import { ButtonUp } from '../ButtonUp';
import { Navigation } from './Navigation';

export const MainLayout = ({
  children,
  basket,
  visibl,
  setVisibl,
  text,
  setText,
  currency,
  setCurrency,
  category,
  setCategory,
  scroll,
  setScroll,
}) => {
  const router = useRouter();

  useEffect(() => {
    let list = document.querySelectorAll('a');
    list.forEach((el) => el.classList.remove(s.active));
    if (router.pathname.length > 3 && router.pathname.length < 8) {
      list[1].classList.add(s.active);
    } else if (router.pathname === '/') {
      list[0].classList.add(s.active);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('scroll', function () {
      setScroll(this.scrollY);
    });
  }, [setScroll]);

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="keywords" content="market, products, next" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Online store developed with next.js"
        />
      </Head>
      <Navigation
        currency={currency}
        setCurrency={setCurrency}
        setText={setText}
        setVisibl={setVisibl}
        basket={basket}
      />
      <main className={s.container}>{children}</main>
      <Footer category={category} setCategory={setCategory} />
      <MyModal text={text} setVisibl={setVisibl} visibl={visibl} />
      {scroll > 450 && <ButtonUp />}
    </>
  );
};

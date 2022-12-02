import s from '../../styles/Layout.module.css';
import { useRouter } from 'next/router';

export const Footer = ({ category, setCategory }) => {
  const router = useRouter();

  const clickCategory = (e) => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    if (e.target.localName === 'li') {
      setCategory(e.target.innerHTML);
      window.scroll(0, 0);
    }
  };

  return (
    <div className={s.footer}>
      <div>
        <ul onClick={clickCategory}>
          <span>Категории:</span>
          <li>{`men's clothing`}</li>
          <li>jewelery</li>
          <li>electronics</li>
          <li>{`women's clothing`}</li>
        </ul>
        <ul>
          {' '}
          <span>Контакты:</span>
          <li>+111-22-333-44-55</li>
          <li>+111-22-333-44-55</li>
          <li>shop@yandex.ru</li>
          <li>г.Минск ул.Минская д.1 кв.1</li>
        </ul>
      </div>
      <div>2022-2022© Интернет-магазин. Все права защищены.</div>
    </div>
  );
};

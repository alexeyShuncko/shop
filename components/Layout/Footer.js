import s from '../../styles/Layout.module.css';
import { useRouter } from 'next/router';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export const Footer = ({ category, setCategory }) => {
  const router = useRouter();

  const defaultState = {
    center: [53.917846, 27.589149],
    zoom: 13,
  };

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
      <div className={s.contactsBlock}>
        <div>
          <span>Категории:</span>
          <ul onClick={clickCategory}>
            <li>{`men's clothing`}</li>
            <li>jewelery</li>
            <li>electronics</li>
            <li>{`women's clothing`}</li>
          </ul>
        </div>
        <div className={s.contacts}>
          <div>
            <span>Контакты:</span>
            <ul>
              <li>+111-22-333-44-55</li>
              <li>+111-22-333-44-55</li>
              <li>shop@yandex.ru</li>
              <li>г.Минск пр.Независимости 58</li>
            </ul>
          </div>

          <YMaps
            preload
            query={{
              apikey: '53dca892-14fc-4fba-94d9-e871421fff5e',
              load: 'package.full',
            }}>
            <Map defaultState={defaultState}>
              <Placemark geometry={[53.917846, 27.589149]} />
            </Map>
          </YMaps>
        </div>
      </div>
      <div className={s.copy}>
        2022-2023© Интернет-магазин. Все права защищены.
      </div>
    </div>
  );
};

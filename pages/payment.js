import { useRouter } from 'next/router';
import Image from 'next/image';
import s from '../styles/Payment.module.css';
import chip from '../public/chip.png';
import visa from '../public/visa.png';
import { useState } from 'react';

export default function Payment({
  setVisibl,
  setText,
  setBasket,
  basket,
  currency,
}) {
  const router = useRouter();
  const [data, setData] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    month: '',
    year: '',
    name: '',
    CVC: '',
  });

  const handlerPayment = (e) => {
    e.preventDefault();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (
          ((key === 'num1' ||
            key === 'num2' ||
            key === 'num3' ||
            key === 'num4') &&
            element.length < 4) ||
          ((key === 'month' || key === 'year') && element.length < 2) ||
          (key === 'CVC' && element.length < 3) ||
          element.length === 0
        ) {
          const inp = document.getElementById(key);
          inp.classList.add(s.error);
          inp.focus();
          return;
        }
      }
    }
    router.push(`/`);
    setText('Успешно оплачено!');
    setVisibl(true);
    setBasket([]);
  };

  const jump = (e) => {
    e.target.classList.contains(s.error) && e.target.classList.remove(s.error);

    const regex1 = /[^0-9]/;
    const regexEng = /[^A-Za-z ]/;

    if (e.target.id !== 'name') {
      e.target.value = e.target.value.replace(regex1, '');
    } else {
      e.target.value = e.target.value.replace(regexEng, '');
    }
    data[e.target.id] = e.target.value;
    setData({ ...data });

    if (e.target.value.length === 4 && e.target.id !== 'num4') {
      e.target.nextSibling.focus();
    }
    if (e.target.value.length === 4 && e.target.id === 'num4') {
      e.target.parentNode.nextSibling.lastChild.firstChild.focus();
    }
    if (e.target.value.length === 2 && e.target.id === 'month') {
      e.target.nextSibling.nextSibling.focus();
    }
    if (e.target.value.length === 2 && e.target.id === 'year') {
      e.target.parentNode.parentNode.nextSibling.firstChild.focus();
    }
  };

  return (
    <div className={s.payment}>
      <div>
        {currency === 'BYN' ? (
          <span className={s.textTotal}>
            К оплате:{' '}
            {basket
              .map((el) => el.price * el.amount * 2.5)
              .reduce((acc, sum) => acc + sum, 0)
              .toFixed(2)}{' '}
            Br
          </span>
        ) : (
          <span className={s.textTotal}>
            К оплате:{' '}
            {basket
              .map((el) => el.price * el.amount)
              .reduce((acc, sum) => acc + sum, 0)
              .toFixed(2)}{' '}
            $
          </span>
        )}
      </div>
      <div className={s.cardBlock}>
        <div className={s.card}>
          <div className={s.bank}>
            <span>Ваш банк</span>
            <Image src={visa} alt="Visa" width={90} height={28} />
          </div>
          <div className={s.chip}>
            <Image src={chip} alt="Чип" width={28} height={20} />
          </div>
          <form className={s.formCard}>
            <div className={s.num}>
              <input
                maxLength={4}
                autoFocus
                autoComplete="off"
                id="num1"
                onChange={jump}
                value={data.num1}
              />
              <input
                maxLength={4}
                autoComplete="off"
                id="num2"
                onChange={jump}
                value={data.num2}
              />
              <input
                maxLength={4}
                id="num3"
                autoComplete="off"
                onChange={jump}
                value={data.num3}
              />
              <input
                maxLength={4}
                id="num4"
                autoComplete="off"
                onChange={jump}
                value={data.num4}
              />
            </div>
            <div className={s.date}>
              <span>Срок действия</span>
              <div>
                <input
                  maxLength={2}
                  autoComplete="off"
                  id="month"
                  onChange={jump}
                  value={data.month}
                />
                <span>/</span>
                <input
                  maxLength={2}
                  id="year"
                  autoComplete="off"
                  onChange={jump}
                  value={data.year}
                />
              </div>
            </div>
            <div className={s.name}>
              <input
                id="name"
                autoComplete="off"
                onChange={jump}
                value={data.name}
              />
              <span>Имя владельца</span>
            </div>
            <div className={s.cvc}>
              <input maxLength={3} id="CVC" onChange={jump} value={data.CVC} />
              <span>CVC</span>
            </div>
            <div className={s.btnBlock}>
              <button
                type={'button'}
                className="btn normal"
                onClick={() => router.push(`/basket`)}>
                В корзину
              </button>
              <button
                type={'submit'}
                className="btn success"
                onClick={handlerPayment}>
                Оплатить
              </button>
            </div>
          </form>
        </div>
        <div className={s.card1}>
          <div className={s.strip}></div>
        </div>
      </div>
    </div>
  );
}

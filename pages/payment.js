import { useRouter } from 'next/router';
import Image from 'next/image';
import s from '../styles/Payment.module.css';
import chip from '../public/chip.png';
import visa from '../public/visa.png';
import { useState, useEffect, useRef } from 'react';

export default function Payment({ setVisibl, setText, setBasket }) {
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
    router.push(`/`);
    setBasket([]);
    setText('Успешно оплачено!');
    setVisibl(true);
  };

  const jump = (e) => {
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
      <div>Оплата</div>
      <div className={s.cardBlock}>
        <div className={s.card1}>
          <div className={s.strip}></div>
          <div className={s.cvc}>
            <input maxLength={3} id="CVC" onChange={jump} value={data.CVC} />
            <span>CVC</span>
          </div>
        </div>
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
            <button
              type={'submit'}
              className="btn success"
              onClick={handlerPayment}>
              Оплатить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

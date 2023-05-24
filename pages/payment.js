import { useRouter } from 'next/router';

export default function Payment({ setVisibl, setText, setBasket }) {
  const router = useRouter();
  const handlerPayment = () => {
    router.push(`/`);
    setBasket([]);
    setText('Успешно оплачено!');
    setVisibl(true);
  };
  return (
    <div>
      <div>Оплата</div>
      <button className="btn success" onClick={handlerPayment}>
        Оплатить
      </button>
    </div>
  );
}

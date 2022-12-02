import s from '../styles/ButtonUp.module.css';

export const ButtonUp = () => {
  const clickUpScroll = () => {
    window.scrollTo(0, 0);
  };
  return (
    <button className={s.btn} onClick={clickUpScroll}>
      <span></span>
    </button>
  );
};

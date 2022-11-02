import s from '../styles/MyModal.module.css'

export const MyModal =({text})=> {
  
  return (
    <div className={s.modal}>
     {text}
    </div>
)
}

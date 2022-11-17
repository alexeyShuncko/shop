import { useState } from 'react'
import s from '../styles/MySelect.module.css'



export const MySelect = ({ value='без сортировки', setValue, dataList }) => {

    const [open, setOpen] = useState(false)


    const clickHandlerSelect = (e) => {
        e.stopPropagation()
        e.currentTarget.lastChild.classList.toggle(s.active)
        setOpen(!open)
        if (e.target.localName === 'li') {
            setOpen(!open)
            setValue(e.target.innerHTML)
            e.currentTarget.lastChild.classList.remove(s.active)
        }
    }

    const blurHandlerSelect =(e)=> {
        setOpen(false)
        e.currentTarget.lastChild.classList.remove(s.active)
    }


    return (
        <button 
        className={s.mySelect} 
        onClick={clickHandlerSelect} 
        onBlur={blurHandlerSelect}>
            <span>{value}</span>
            {
                open &&
                <ul>
                    {dataList.map(option => <li key={option}>{option}</li>)}
                </ul>
            }
            <span className={s.arrow}></span>
        </button>
    )
}
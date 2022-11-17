import { useState } from 'react'
import s from '../styles/MySelect.module.css'



export const MySelect = ({ value, setValue, dataList, setVisibl, setText, size }) => {

    const [open, setOpen] = useState(false)
    const width = size === 'small' ? '71px' : '160px'

    const clickHandlerSelect = (e) => {
        e.stopPropagation()
        e.currentTarget.lastChild.classList.toggle(s.active)
        setOpen(!open)
        if (e.target.localName === 'li') {
            setOpen(!open)
            setValue(e.target.innerHTML)
            if (setText) {
                const body = document.querySelector('body')
                body.style.pointerEvents = 'none'
                setText('Валюта изменена!')
                setVisibl(true)
            }
            e.currentTarget.lastChild.classList.remove(s.active)
        }
    }

    const blurHandlerSelect = (e) => {
        setOpen(false)
        e.currentTarget.lastChild.classList.remove(s.active)
    }

    return (
        <button
            style={{ width: width }}
            className={s.mySelect}
            onClick={clickHandlerSelect}
            onBlur={blurHandlerSelect}>
            <span>{value}</span>
            {open && <ul style={{ width: width }}>{dataList.map(option => <li key={option}>{option}</li>)}</ul>}
            <span className={s.arrow}></span>
        </button>
    )
}
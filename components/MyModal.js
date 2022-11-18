import s from '../styles/MyModal.module.css'
import { useEffect } from 'react'

export const MyModal = ({ text, visibl, setVisibl }) => {

    useEffect(() => {
        const modal = document.getElementById('modal')
        modal && modal.focus()
    }, [visibl])


    const blurHandler = () => {
        setVisibl(false)
    }

    let color = text.includes('удалён') ? '#e26868' : '#2ECC71'

    return (
        <>
            {visibl &&
                <button className={s.modal} id='modal' style={{ background: color }} onBlur={blurHandler}>
                    <span> {text}</span>
                </button>
            }
        </>
    )
}

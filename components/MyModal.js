import s from '../styles/MyModal.module.css'


export const MyModal = ({ text, visibl, setVisibl }) => {

    if (visibl) {
        setTimeout(() => {
            setVisibl(false)
            const body = document.querySelector('body')
            body.style.pointerEvents ='auto'
        }, 1200)
    }

    let color = text.includes('удалён') ? '#e26868' :'#2ECC71'

    return (
        <>
            {visibl &&
                <div className={s.modal} id='modal' style={{background: color}}>
                    <span> {text}</span>
                </div>
            }
        </>
    )
}

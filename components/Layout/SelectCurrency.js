


export const SelectCurrency = ({currency, setCurrency, setVisibl, setText}) => {


    const changeCurrencyHandler =(e)=> {
        const body = document.querySelector('body')
        body.style.pointerEvents ='none'
        setText('Валюта изменена!')
        setVisibl(true)
        setCurrency(e.target.value)
    }

    return (
        <select value={currency} onChange={changeCurrencyHandler} 
        style={{background: '#2ECC71'}}>
            <option style={{background: '#ccc'}}>USD</option>
            <option style={{background: '#ccc'}}>BYN</option>
        </select>
    )
}
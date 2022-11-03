


export const SelectCurrency = ({currency, setCurrency}) => {
    return (
        <select value={currency} onChange={(e)=> setCurrency(e.target.value)} style={{background: '#2ECC71'}}>
            <option style={{background: '#ccc'}}>USD</option>
            <option style={{background: '#ccc'}}>BYN</option>
        </select>
    )
}
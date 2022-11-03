


export const SelectCurrency = ({currency, setCurrency}) => {
    return (
        <select value={currency} onChange={(e)=> setCurrency(e.target.value)}>
            <option >USD</option>
            <option >BYN</option>
        </select>
    )
}
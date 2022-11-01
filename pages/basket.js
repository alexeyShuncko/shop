

export default function Basket({basket}) {
    return (
        <>
          {
            basket.map(el => (
                <div key={el.id}>
                    {el.title}
                </div>
            ))
          }
        </>
    )
}

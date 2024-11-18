import "./card.css" ;

function Card({message , result , extra}) {
    return (
        <div className="weather-card">
            <h3 className="card-content" >{message}</h3>
            <p style={{textAlign:"center"}}>{result}{extra}</p>
        </div>
    ) ;
}

export default Card ;
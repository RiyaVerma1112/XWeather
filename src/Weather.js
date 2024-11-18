import { useEffect, useState } from "react";
import "./weather.css";
import "./Card";
import Card from "./Card";

function Weather() {
    const [data, setData] = useState({});
    const [searchedWord, setSearchedWord] = useState("");  
    const [resultForCity, setResultForCity] = useState(null);  
    const [loading, setLoading] = useState(false);

    const key = `5cff10aad7db460992f181902241811`;

    useEffect(() => {
        const fetchData = async () => {
            // very imp 3 lines
            if (!resultForCity) return;  
            setLoading(true);
            setData({});  
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(resultForCity)}`
                );
                if (response.status === 400) {
                    setLoading(false);
                    alert(`Failed to fetch weather data`);
                    setSearchedWord("") ;
                    return;
                } else {
                    const result = await response.json();
                    if (result.error) {
                        alert(`Location "${resultForCity}" not found!`);
                    } else {
                        setData(result);
                        setLoading(false) ;
                    }
                }
            } catch (error) {
                console.error("Error: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [resultForCity]);

    const handleSearch = (event) => {
        setSearchedWord(event.target.value); 
    };

    const handleSubmit = () => {
        if (searchedWord === "") {
            alert("Please enter a valid city name.");
            setData({});  
            return;
        }
        setResultForCity(searchedWord);  // Set the result for fetching data
    };

    return (
        <div>
            <div className="input-container">
                <input
                    type="text"
                    value={searchedWord}
                    onChange={handleSearch}
                    className="input"
                />
                <button className="btn" onClick={handleSubmit}>
                    Search
                </button>
            </div>
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading data…</p>
            ) : (
                resultForCity &&
                data.current && (
                    <div className=".weather-cards">
                        <Card message="Temperature" result={data.current.temp_c} extra="°C" />
                        <Card message="Humidity" result={data.current.humidity} extra="%" />
                        <Card message="Condition" result={data.current.condition.text} extra="" />
                        <Card message="Wind Speed" result={data.current.wind_kph} extra=" kph" />
                    </div>
                )
            )}
        </div>
    );
}

export default Weather;

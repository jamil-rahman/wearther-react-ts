import { useEffect, useState } from "react";
import WeatherWidget from "./WeatherWidget";
import Loader from "./Loader";
import TyperWriterEffect from "./TypeWriterEffect";
import InputForm from "./InputForm";

interface WeatherDetails {
    temp: number;
    weather: { description: string }[];
    humidity: number;
    wind_speed: number;
    visibility: number;
    feels_like: number;
}

function ProvinceForm({ country }: { country: string }) {
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({ province: "", city: "" });
    const [provinceData, setProvinceData] = useState<{ [key: string]: string[] }>({});
    const [aiOutput, setAiOutput] = useState<string | null>(null);
    const [weatherDetails, setWeatherDetails] = useState<null | WeatherDetails>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setProvinceData(data));
    }, []);

    const validateProvince = (value: string) => {
        if (!provinceData[value]) {
            setErrors((prev) => ({ ...prev, province: "Invalid province name" }));
        } else {
            setErrors((prev) => ({ ...prev, province: "" }));
        }
    };

    const validateCity = (province: string, value: string) => {
        if (province && !provinceData[province]?.includes(value)) {
            setErrors((prev) => ({ ...prev, city: "Invalid city name" }));
        } else {
            setErrors((prev) => ({ ...prev, city: "" }));
        }
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProvince(value);
        validateProvince(value);
        setCity("");
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);
        validateCity(province, value);
    };

    const handleReload = () => window.location.reload();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (errors.province || errors.city) {
            return;
        }

        try {
            const weatherResponse = await fetch(`/api/weather?province=${province}&city=${city}`);
            const weatherData = await weatherResponse.json();

            if (weatherResponse.ok) {
                setWeatherDetails(weatherData);
                setError("");
                const aiResponse = await fetch('/api/ai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(weatherData),
                });

                const aiResult = await aiResponse.json();

                if (aiResult.success) {
                    setAiOutput(aiResult.response);
                } else {
                    console.error('Error from AI API:', aiResult.error);
                }
            } else {
                setError(weatherData.error || "An unexpected error occurred");
            }
        } catch (error) {
            setError("An error occurred while fetching weather data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:px-2 max-w-md mx-auto">
            <InputForm
                province={province}
                city={city}
                errors={errors}
                handleProvinceChange={handleProvinceChange}
                handleCityChange={handleCityChange}
                handleReload={handleReload}
                handleSubmit={handleSubmit}
            />

            {loading && <Loader />}

            {aiOutput && (
                <div className="mt-4">
                    <h2 className="md:text-2xl font-oxygen text-center font-semibold m-4">AI Clothing Suggests ✨</h2>
                    <TyperWriterEffect text={aiOutput.replace(/\*/g, '')} speed={4} />
                    <p className="mt-2 text-center text-sm text-cyan-600 bold font-medium italic">
                        Note: This suggestion is AI-generated. Please verify the information before heading out.
                    </p>
                </div>
            )}

            {weatherDetails && (
                <>
                    <h3 className="md:text-2xl font-oxygen font-semibold text-center m-4">At a Glance 👓</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                        {[
                            { title: "Temperature", text: `${(weatherDetails.temp - 273.15).toFixed(2)} °C`, image: "/temperature.png", bg_path: "/temp-bg.jpg" },
                            { title: "Conditions", text: `${weatherDetails.weather[0].description} `, image: "/conditions.png", bg_path: "/cloud-bg.jpg" },
                            { title: "Humidity", text: `${weatherDetails.humidity}% `, image: "/humidity.png", bg_path: "/humidity-bg.jpg" },
                            { title: "Wind Speed", text: `${weatherDetails.wind_speed} m/s `, image: "/wind-speed.png", bg_path: "/wind-bg.jpg" },
                            { title: "Visibility", text: `${weatherDetails.visibility / 1000} kilometers `, image: "/visibility.png", bg_path: "/visibility-bg.jpg" },
                            { title: "Feels Like", text: `${(weatherDetails.feels_like - 273.15).toFixed(2)}°`, image: "/feels_like.png", bg_path: "/feels-bg.jpg" },
                        ].map((detail, index) => (
                            <WeatherWidget key={index} title={detail.title} text={detail.text} image={detail.image} bg_path={detail.bg_path}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );


}

export default ProvinceForm;

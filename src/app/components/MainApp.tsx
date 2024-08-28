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
        <div className="w-full px-4 max-w-md mx-auto">
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
                <div className="mt-4 px-4">
                    <h2 className="text-lg font-semibold">AI Clothing Suggestions</h2>
                    <TyperWriterEffect text={aiOutput.replace(/\*/g, '')} speed={4} />
                </div>
            )}

            {weatherDetails && (
                <>
                    <h3 className="text-center mt-2 text-lg">At a Glance!</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                        <WeatherWidget title="Temperature" text={(weatherDetails.temp - 273.15).toFixed(2) + " °C 🌡️"} />
                        <WeatherWidget title="Conditions" text={weatherDetails.weather[0].description + " ☁️"} />
                        <WeatherWidget title="Humidity" text={weatherDetails.humidity + "% 💧"} />
                        <WeatherWidget title="Wind Speed" text={weatherDetails.wind_speed + " m/s 🌬️"} />
                        <WeatherWidget title="Visibility" text={weatherDetails.visibility / 1000 + " kilometers 👁️"} />
                        <WeatherWidget title="Feels Like" text={(weatherDetails.feels_like - 273.15).toFixed(2) + " °C 🌡️"} />
                    </div>
                </>
            )}
        </div>
    );


}

export default ProvinceForm;

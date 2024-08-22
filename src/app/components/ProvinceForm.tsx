import { useEffect, useState } from "react";

function ProvinceForm({ country }: { country: string }) {
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({ province: "", city: "" });
    const [provinceData, setProvinceData] = useState<{ [key: string]: string[] }>({});
    const [aiOutput, setAiOutput] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        //state and city data is fetched from data.json 
        //for validation purpose
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
        setCity(""); // Reset city if province changes
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);
        validateCity(province, value);
    };

    const handleReload = () => window.location.reload();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Call the weather API
            const weatherResponse = await fetch(`/api/weather?province=${province}&city=${city}`);
            const weatherData = await weatherResponse.json();

            if (weatherResponse.ok) {
                setError("");
                // Pass the weather data to the AI API
                const aiResponse = await fetch('/api/ai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(weatherData), // Pass weather data here
                });

                const aiResult = await aiResponse.json();

                if (aiResult.success) {
                    console.log('AI Response:', aiResult.response);
                } else {
                    console.error('Error from AI API:', aiResult.error);
                }
            } else {
                setError(weatherData.error || "An unexpected error occurred");
            }
        } catch (error) {
            setError("An error occurred while fetching weather data");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="province">Province:</label>
                    <input
                        type="text"
                        id="province"
                        value={province}
                        onChange={handleProvinceChange}
                        required
                        className="border px-4 py-2 rounded-lg mb-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={handleCityChange}
                        required
                        className="border px-4 py-2 rounded-lg mb-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" >
                    Get Weather
                </button>
                <button type="button" className="bg-yellow-500 text-black px-4 py-2 rounded-lg ml-4" onClick={handleReload}>
                    Go Back
                </button>
            </form>


        </div>
    );
}

export default ProvinceForm;

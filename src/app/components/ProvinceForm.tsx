import { useEffect, useState } from "react";

function ProvinceForm({ country }: { country: string }) {
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({ province: "", city: "" });
    const [provinceData, setProvinceData] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        // Fetch the JSON data when the component mounts
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

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Select a Province in {country}</h2>
            <input
                type="text"
                placeholder="Enter province"
                value={province}
                onChange={handleProvinceChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
            />
            {errors.province && <p className="text-red-500">{errors.province}</p>}

            {province && !errors.province && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Select a City in {province}</h2>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={handleCityChange}
                        className="border px-4 py-2 rounded-lg mb-2 w-full"
                    />
                    {errors.city && <p className="text-red-500">{errors.city}</p>}
                </>
            )}
        </div>
    );
}

export default ProvinceForm;

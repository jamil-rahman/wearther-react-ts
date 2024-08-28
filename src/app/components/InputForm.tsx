import React from 'react'

interface InputFormProps {
    province: string;
    city: string;
    errors: { province: string; city: string };
    handleProvinceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleReload: () => void;
    handleSubmit: (e: React.FormEvent) => void;
}


function InputForm({
    province,
    city,
    errors,
    handleProvinceChange,
    handleCityChange,
    handleReload,
    handleSubmit
}: InputFormProps) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="province">Province:</label>
                <input
                    type="text"
                    id="province"
                    value={province}
                    onChange={handleProvinceChange}
                    required
                    placeholder='e.g. Ontario'
                    className="border px-4 py-2 rounded-lg mb-2 w-full"
                />
                {errors.province && <span className="text-red-500">{errors.province}</span>}
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={handleCityChange}
                    required
                    placeholder='e.g. Toronto'
                    className="border px-4 py-2 rounded-lg mb-2 w-full"
                />
                {errors.city && <span className="text-red-500">{errors.city}</span>}
            </div>
            <div className="flex justify-between mt-4">
                <button type="submit" className="button-50">
                    Get Weather
                </button>
                <button type="button" className="button-51 ml-6" onClick={handleReload}>
                    Go Back
                </button>
            </div>
        </form>
    );
}
export default InputForm
'use client';
import { useState } from "react";
import ProvinceForm from "./ProvinceForm";
import StateForm from "./StateForm";

export default function CountryButton() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center justify-center mt-3">
            {!selectedCountry && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Where are you from?</h2>
                    <div className="flex space-x-4 justify-center">
                        <div
                            onClick={() => setSelectedCountry("USA")}
                            className="bg-white text-gray-900 hover:text-white border-4 border-black-200 px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center space-x-2"
                        >
                            <img src="/usa.png" alt="USA Flag" className="w-6 h-6" />
                            <span>USA</span>
                        </div>
                        <div
                            onClick={() => setSelectedCountry("Canada")}
                            className="bg-white text-gray-900 border-4 border-black-200 hover:text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex items-center space-x-2"
                        >
                            <img src="/canada.png" alt="Canada Flag" className="w-6 h-6" />
                            <span>Canada</span>
                        </div>
                    </div>
                </div>
            )}
            {selectedCountry === "USA" && <StateForm country="USA" />}
            {selectedCountry === "Canada" && <ProvinceForm country="Canada" />}
        </div>
    );
}

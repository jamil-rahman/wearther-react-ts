import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const province = searchParams.get("province");
    const city = searchParams.get("city");
    const ow_api_key = process.env.OPENWEATHER_API_KEY

    if (!city || !province) {
        return NextResponse.json({ error: 'City and province are required' }, { status: 400 });
    }

    const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${province},CA&limit=1&appid=${ow_api_key}`;

    try {
        // Fetch the geographic coordinates based on the city and province
        const geoResponse = await axios.get(geoApi);
        const geoData = geoResponse.data;

        // Handle case where the city is not found
        if (!geoData.length) {
            return NextResponse.json({ error: 'City not found' }, { status: 404 });
        }

        const { lat, lon } = geoData[0];
      

        //   Fetch the weather data using the geographic coordinates
        const weatherApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${ow_api_key}`;
        const weatherResponse = await axios.get(weatherApi);
        const weatherData = weatherResponse.data;

        // Return the weather data as JSON
        return NextResponse.json(weatherData.current);
        
    }
    catch (error) {
        // Handle errors (e.g., network issues, API errors)
        console.log("weather api",error)
        return NextResponse.json({ error: 'An error occurred while fetching weather data' }, { status: 500 });
    }
}
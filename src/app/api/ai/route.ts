import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    const apiKey: string = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);


    const weatherData = await req.json()

    const tempCelsius = weatherData.temp - 273.15;
    const conditions = weatherData.weather[0].description;
    const humidity = weatherData.humidity;
    const wind_speed = weatherData.wind_speed;
    const visibility = weatherData.visibility;
    const wind_gust = weatherData.wind_gust;
    const feels_like = weatherData.feels_like - 273.15;
    const uv_index = weatherData.uvi;
    const clouds = weatherData.clouds;
    const weather_description = weatherData.weather[0].description;

    const weatherSummary = `
        Temperature: ${tempCelsius.toFixed(2)}°C
        Conditions: ${conditions}
        Humidity: ${humidity}%
        Wind Speed: ${wind_speed} m/s
        Visibility: ${visibility} meters
        Wind Gust: ${wind_gust} m/s
        Feels Like: ${feels_like}°C
        UV Index: ${uv_index}
        Clouds: ${clouds}%
        Weather Description: ${weather_description}
`;

    console.log("weather summary", weatherSummary);


    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            candidateCount: 1,
            // stopSequences: ["x"],
            // maxOutputTokens: 20,
            temperature: 1.0,
        },
    });

    let content: string = "";

    try {
        const prompt = `The weather data for today in my city is as follows:
        ${weatherSummary}, Based on this data, give me a weather summary and recommend a some combinations 
        of clothings that I can pull of as my outfit for me to wear today or what should be I be carrying.
        Give me a few options to choose from. I don't need technical details, just the outfit ideas. Give me 
        the output in a paragraph format. The tone should be jolly and cheerful. Don't include * or any asterisk in the output.
        The summary should be in a separate pargaraph from the outfit ideas.
        Suggest outfit for both males and females in separate pargaraphs.`;

        console.log("AI prompt", prompt);

        const result = await model.generateContent(prompt);
      
        if (result && result.response.candidates && result.response.candidates.length > 0) {
            const aiResponse = result.response.candidates[0]; 
           

            // Type Safety Check
            content = aiResponse.content.parts[0].text ?? "";
            console.log("content field", content);

        } else {
            console.log("Content or text function is not available");
        }

        return NextResponse.json({ success: true, response: content });
    }
    catch (error) {
        console.log("AI api", error)
        return NextResponse.json({ error: 'An error occurred while fetching weather data' }, { status: 500 });
    }
}
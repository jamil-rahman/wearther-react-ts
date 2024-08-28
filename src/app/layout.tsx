import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "What to Wearther | Find the right fit for your day",
  description: `Discover accurate weather forecasts tailored to your location with our 
  AI-powered weather app. Get personalized clothing suggestions based on real-time weather data 
  and be prepared for any weather conditions. Ideal for unpredictable climates, WW helps you 
  stay comfortable and stylish every day.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-timberwolf">
        <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-32">
          <Navbar />
          <main className="font-raleway flex min-h-screen flex-col items-center bg-white justify-between p-25 border border-x-gray-300">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

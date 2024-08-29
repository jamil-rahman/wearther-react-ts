import Image from 'next/image';
import React, { ReactNode } from 'react';

interface WeatherWidgetProps {
  title: string;
  text: ReactNode;
  image: string;
  bg_path: string;
}

function WeatherWidget({ title, text, image, bg_path }: WeatherWidgetProps) {
  return (
    <div className="py-12  md:py-9 px-10 md:px-5 w-md h-md bg-white rounded-xl shadow-lg space-x-4" style={{ backgroundImage: `url(${bg_path})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.9 }}>
      <div className='flex flex-col justify-center items-center bg-white text-black p-5 md:p-2 rounded-lg opacity-89'>
        <h3 className="text-xl font-medium  bold">{title}</h3>
        <p className="bold">{text} </p>
        <Image src={image} alt="Weather icon" width={30} height={30} />
      </div>
    </div>
  );
}

export default WeatherWidget;

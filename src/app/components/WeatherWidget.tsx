import React, { ReactNode } from 'react';

interface WeatherWidgetProps {
  title: string;
  text: ReactNode;
}

function WeatherWidget({ title, text }: WeatherWidgetProps) {
  return (
    <div className="p-12 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div>
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <p className="text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default WeatherWidget;

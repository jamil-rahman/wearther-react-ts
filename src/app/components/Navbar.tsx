import Image from 'next/image';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-dogwood-rose h-16 flex items-center justify-between px-5 shadow-md font-kanit">
      <div className="flex items-center space-x-3">
       <Image src="/logo-2.png" alt="Wearther Logo" width={40} height={40} />
        {/* Text */}
        <span className="text-2xl font-bold tracking-wide">
          Wearther
        </span>
      </div>
    </nav>
  );
}

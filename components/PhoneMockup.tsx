"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PhoneMockupProps {
  images: string[];
}

export default function PhoneMockup({ images }: PhoneMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[310px] h-[560px] sm:h-[600px] border-[6px] border-black bg-yellow-300 rounded-[44px] p-3 shadow-[10px_10px_0_#000] select-none shrink-0">
      {/* Notch / Câmera Frontal */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-neutral-800 border-[2px] border-neutral-600"></div>
      </div>

      {/* Tela Interna */}
      <div className="relative w-full h-full border-[4px] border-black bg-white rounded-[32px] overflow-hidden">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt="Calculator Preview"
              fill
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Botão de Home Inferior (Estilo Neo-Brutalista) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-2 bg-black rounded-full z-20"></div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
}

export default function AdBanner({
  slotId = "default-slot",
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Initialize Google AdSense when publisher ID is configured
      // ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error", e);
    }
  }, []);

  return (
    <div className={`my-8 text-center ${className}`}>
      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 block">
        {label}
      </span>
      {/* ADSENSE PLACEHOLDER SLOT - NEO BRUTALIST WRAPPER */}
      <div className="border-[4px] border-black bg-neutral-100 p-4 min-h-[100px] flex items-center justify-center relative overflow-hidden">
        {/* Replace data-ad-client with your real Google AdSense Publisher ID */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase tracking-wider text-neutral-400 pointer-events-none select-none">
          [ AdSense Slot: {format} ]
        </div>
      </div>
    </div>
  );
}

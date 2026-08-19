import React, { useEffect } from "react";

const FancyLoader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-6 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-200">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#E0C163] border-t-transparent animate-spin"></div>
        </div>
        <div className="text-gray-800 text-sm font-semibold tracking-wide">
          Please wait...
        </div>
      </div>
    </div>
  );
};

export default FancyLoader;


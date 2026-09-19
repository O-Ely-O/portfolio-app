import React from 'react';

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 
        Vibrant luminous geometric spheres placed behind the glass card.
        Their saturated colors refract through the frosted glass panels (backdrop-filter: blur(28px)),
        producing the hallmark glassmorphism optical depth seen in the reference tutorial.
      */}

      {/* Top Left: Electric Cyan & Azure Orb */}
      <div className="absolute -top-16 -left-16 w-96 h-96 sm:w-[32rem] sm:h-[32rem] rounded-full bg-gradient-to-br from-cyan-400/70 via-sky-500/60 to-blue-600/70 blur-2xl animate-orb-1" />

      {/* Center Right: Vibrant Warm Amber & Coral Sphere */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-gradient-to-tr from-amber-400/60 via-orange-500/50 to-rose-400/50 blur-2xl animate-orb-2" />

      {/* Bottom Left: Electric Violet & Indigo Orb */}
      <div className="absolute -bottom-24 left-1/10 w-96 h-96 sm:w-[30rem] sm:h-[30rem] rounded-full bg-gradient-to-tr from-indigo-600/60 via-purple-500/50 to-pink-400/40 blur-2xl animate-orb-3" />

      {/* Bottom Right: Bright Sky Blue Glow */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-sky-400/60 via-blue-500/50 to-cyan-300/40 blur-2xl animate-orb-1" />

      {/* Center ambient glow underneath the main glass interface */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-sky-300/35 blur-3xl" />

      {/* Floating 3D-styled translucent glass spheres */}
      <div className="absolute top-12 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(0,120,255,0.25)] animate-orb-2 hidden md:block" />
      <div className="absolute bottom-16 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-white/50 to-white/10 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(255,140,0,0.2)] animate-orb-3 hidden md:block" />

      {/* Subtle retro accents */}
      <div className="absolute top-4 left-6 opacity-40 hidden 2xl:block">
        <div className="grid grid-cols-3 gap-1 w-16 h-10 p-1 rounded-xl bg-white/30 backdrop-blur-md border border-white/60 shadow-xs">
          <div className="bg-sky-400/70 rounded col-span-1" />
          <div className="bg-sky-400/70 rounded col-span-1" />
          <div className="col-span-1" />
          <div className="col-span-1" />
          <div className="bg-sky-400/70 rounded col-span-1" />
          <div className="bg-sky-400/70 rounded col-span-1" />
        </div>
      </div>

      <div className="absolute top-4 right-8 opacity-40 hidden 2xl:block">
        <div className="grid grid-cols-3 gap-1 w-16 h-10 p-1 rounded-xl bg-white/30 backdrop-blur-md border border-white/60 shadow-xs">
          <div className="bg-amber-400/80 rounded col-span-1" />
          <div className="bg-amber-400/80 rounded col-span-1" />
          <div className="bg-amber-400/80 rounded col-span-1" />
          <div className="col-span-1" />
          <div className="bg-amber-400/80 rounded col-span-1" />
          <div className="col-span-1" />
        </div>
      </div>
    </div>
  );
};

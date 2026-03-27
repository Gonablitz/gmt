import React from 'react';

const CertificationNode = ({ issuer, title, date, color, modules = [] }) => {
  const variants = {
    cyan: "border-cyan-500/50 bg-cyan-950/20 text-cyan-400 drop-shadow-[0_0_2px_rgba(34,211,238,0.5)]",
    blue: "border-blue-500/50 bg-blue-950/20 text-blue-400 drop-shadow-[0_0_2px_rgba(59,130,246,0.5)]",
  };

  const selectedVariant = variants[color] || variants.cyan;

  return (
    <div className="relative group transition-all duration-500 hover:z-10">
      {/* GLOW LAYER */}
      <div className={`absolute inset-0 clip-hexagon opacity-0 group-hover:opacity-100 
                      group-hover:animate-pulse transition-opacity duration-500
                      ${color === 'blue' ? 'bg-blue-500/10' : 'bg-cyan-500/10'}`}>
      </div>

      {/* MAIN HEXAGON BODY */}
      <div className={`w-48 h-56 md:w-56 md:h-64 clip-hexagon border-2 transition-all duration-500 
                      flex flex-col items-center justify-center p-6 md:p-8 text-center
                      group-hover:scale-110 group-hover:border-white/40
                      ${selectedVariant}`}>
        
        {/* SCANLINE EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/3 w-full animate-scan pointer-events-none"></div>
        
        <span className="text-[7px] uppercase tracking-[0.4em] opacity-60 mb-2 font-black italic">
          {issuer}
        </span>
        
        <h3 className="text-[10px] md:text-xs font-black mb-4 leading-tight uppercase tracking-tighter group-hover:text-white">
          {title}
        </h3>
        
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {modules.slice(0, 3).map((m, i) => (
            <span key={i} className="text-[6px] px-2 py-0.5 bg-black/60 border border-white/10 rounded-full font-bold">
              {m}
            </span>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-white/5 w-full">
          <span className="text-[8px] opacity-40 font-mono tracking-widest">
            {date}_NODE_ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};

export default CertificationNode;
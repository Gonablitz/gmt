import React from 'react';

const Header = () => {
  return (
    <div className="relative w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      {/* --- Left Wing: Identity & Designation --- */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-cyan-500/50" />
          <span className="text-[10px] text-cyan-500 font-black tracking-[0.4em] uppercase">
            Developer
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
  TIMOTHY <span className="text-cyan-500">GONA</span>
</h1>
        
        <div className="flex items-center gap-3 pt-2">
          <span className="text-[11px] text-slate-500 font-bold tracking-widest uppercase">
            Software_Engineer
          </span>
          <div className="h-[1px] w-12 bg-cyan-900/30" />
          <span className="text-[9px] text-cyan-800 font-black tracking-widest uppercase">
            Nairobi_Node
          </span>
        </div>
      </div>

{/* --- Right Wing: System Metrics & Actions --- */}
<div className="flex flex-col items-start md:items-end text-right">
  
  {/* NEW: Download CV Command */}
  <div className="mb-6">
    <a 
      href="/Timothy_Gona_CV.pdf" 
      download="Timothy_Gona_CV.pdf"
      className="group relative inline-flex items-center gap-3 px-4 py-2 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300"
    >
      {/* Decorative scanning line for the button */}
      <div className="absolute inset-0 bg-cyan-400/5 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      
      <a 
  href="/gmt/Timothy_Gona_CV.pdf"
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:cursor-pointer group"
>
  <span className="text-[10px] text-cyan-400 font-black tracking-[0.3em] uppercase group-hover:text-white transition-colors">
    [ GET_RESUME.PDF ]
  </span>
</a> 
      
      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
    </a>
  </div>

  <div className="grid grid-cols-2 md:flex md:flex-row gap-6 border-l md:border-l-0 md:border-r border-cyan-900/30 pl-4 md:pl-0 md:pr-6 py-2">
    <div className="flex flex-col">
      <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Specialization</span>
      <span className="text-[10px] text-cyan-400 font-bold uppercase">A.I // RAG</span>
    </div>
    <div className="flex flex-col">
      <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Affiliation</span>
      <span className="text-[10px] text-cyan-400 font-bold uppercase">KyU_Comp_Soc</span>
    </div>
  </div>
</div>

      {/* Background Decorative Accent: Subtle Grid or Hex */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/5 blur-[100px] pointer-events-none" />
    </div>
  );
};

export default Header;
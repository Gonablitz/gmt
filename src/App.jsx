import React, { useEffect, useState, useRef } from 'react';
import CertificationNode from './components/CertificationNode';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { createClient } from '@supabase/supabase-js';
import Header from './Header.jsx';
import './GmtTab.css';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const NEON_COLORS = ["6, 182, 212", "168, 85, 247", "236, 72, 153", "34, 197, 94", "249, 115, 22"];

const playSuccessSound = () => {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
    osc.connect(gain); gain.connect(context.destination);
    osc.start(); osc.stop(context.currentTime + 0.2);
  } catch (e) { console.error("Audio error:", e); }
};

function App() {
  const [projects, setProjects] = useState([]);
  const [systemLog, setSystemLog] = useState(["Initializing_Protocols...", "Linking_Cloud_Storage..."]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', techStack: '' });
  const [contactMessage, setContactMessage] = useState("");
  const logContainerRef = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) setSystemLog(prev => [...prev, `[ERROR]: ${error.message}`]);
      else {
        setProjects(data || []);
        setSystemLog(prev => [...prev, `Sync_Complete: ${data?.length || 0}_Nodes_Online`]);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    const nodes = document.querySelectorAll('.reveal-node');
    nodes.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [systemLog]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const pin = window.prompt("ENTER_ACCESS_UID:");
        if (pin === "kyu2026") setShowAdmin(!showAdmin);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAdmin]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formattedData = { 
      title: newProject.title,
      category: newProject.category,
      description: newProject.description,
      tech_stack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean) 
    };
    const { data, error } = await supabase.from('projects').insert([formattedData]).select();
    if (!error) {
      setProjects([data[0], ...projects]);
      setNewProject({ title: '', category: '', description: '', techStack: '' });
      setShowAdmin(false);
      playSuccessSound();
    }
  };

  const handleTransmit = async (e) => {
    if (e) e.preventDefault();
    if (!contactMessage.trim()) return;
    const { error } = await supabase.from('messages').insert([{ content: contactMessage }]);
    if (!error) {
      setSystemLog(prev => [`[SUCCESS]: DATA_PACKET_OFFLOADED`, ...prev]);
      setContactMessage("");
      playSuccessSound();
    }
  };

  return (
    /* Main container uses the #01080a color from your screenshot */
    <div className="min-h-screen bg-[#01080a] text-white font-mono selection:bg-cyan-500 selection:text-black transition-colors duration-500">
      
      {/* Background Radial Glow mimicking the "Initializing" screen depth */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#021215_0%,_#01080a_100%)] -z-10" />
      
      <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-16 relative z-10">
        
        {/* Header Section: Integrated with the dark theme */}
        <header className="border border-cyan-900/30 p-8 bg-black/40 backdrop-blur-xl relative group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
          <Header />
          <div className="mt-8 pt-6 border-t border-cyan-900/20 flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
             <p className="text-cyan-500 text-[10px] tracking-[0.3em] uppercase font-black">
               SYSTEM_STATUS: <span className="text-white opacity-80">GMT_OS_UPLINK_STABLE</span>
             </p>
          </div>
        </header>

        {/* Admin Injection Portal */}
        {showAdmin && (
          <section className="p-6 border border-red-500/20 bg-red-500/5 animate-in fade-in slide-in-from-top-4">
             <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input placeholder="TITLE" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className="bg-[#000505] border border-red-900/30 p-3 text-[10px] outline-none focus:border-red-500 transition-colors" required />
               <input placeholder="CATEGORY" value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className="bg-[#000505] border border-red-900/30 p-3 text-[10px] outline-none focus:border-red-500 transition-colors" required />
               <textarea placeholder="DESCRIPTION" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className="bg-[#000505] border border-red-900/30 p-3 text-[10px] md:col-span-2 outline-none focus:border-red-500 min-h-[100px]" />
               <button type="submit" className="md:col-span-2 bg-red-500/10 border border-red-500/50 text-red-500 py-2 text-[10px] font-black hover:bg-red-500 hover:text-black transition-all uppercase tracking-[0.2em]">EXECUTE_DATA_INJECTION</button>
             </form>
          </section>
        )}

        {/* Certifications Row: Subtle high-tech separators */}
        <section className="flex flex-wrap justify-center gap-6 py-10 border-y border-cyan-900/20 bg-cyan-950/5">
          <CertificationNode issuer="Oracle AI" title="AI Vector Search" date="2025" color="cyan" modules={['RAG', 'Embeddings', 'Oracle 23ai']} />
          <CertificationNode issuer="Cisco" title="Data Science" date="2025" color="blue" modules={['Python', 'Pandas', 'Visualization']} />
          <CertificationNode issuer="PLP" title="Software Dev" date="2025" color="cyan" modules={['Full-Stack', 'Dart', 'Mobile Dev']} />
        </section>

        {/* --- ABOUT ME: SYSTEM_PROFILE --- */}
<section className="max-w-4xl mx-auto mb-20 reveal-node bg-[#01080a] border border-cyan-900/30 p-8 md:p-12 relative group overflow-hidden shadow-2xl">
  {/* Corner Neon Brackets */}
  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />
  
  <div className="flex items-center gap-4 mb-8">
    <div className="w-2 h-2 bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
    <h2 className="text-cyan-400 text-[10px] tracking-[0.5em] uppercase font-black">
      [ GMT_BIOMETRIC_PROFILE ]
    </h2>
  </div>

  <div className="grid md:grid-cols-3 gap-10 items-center">
    {/* Visual Identity Node */}
    <div className="md:col-span-1 border border-cyan-900/50 bg-black/60 p-4 aspect-square flex flex-col items-center justify-center relative group-hover:border-cyan-400/50 transition-all">
      <div className="w-full h-full border border-dashed border-cyan-900/50 flex items-center justify-center relative overflow-hidden">
         <div className="text-[10px] text-cyan-900 font-black tracking-tighter text-center uppercase">
           ID_VERIFIED<br/>
           <span className="text-[20px] text-cyan-400 mt-2 block font-mono opacity-80">GMT</span>
         </div>
         {/* Scanning line animation matching your boot screenshot */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1/2 w-full top-0 animate-scan pointer-events-none" />
      </div>
    </div>
    

    {/* Profile Bio Data from CV */}
    <div className="md:col-span-2 space-y-6 text-slate-400 text-[11px] md:text-xs leading-relaxed font-medium">
      <p>
        I am a <span className="text-white font-bold">Software Engineering student at Kirinyaga University</span>  specializing in the intersection of 
        <span className="text-cyan-400"> Full-Stack Development </span>, <span className="text-cyan-400">AI</span>, and <span className="text-cyan-400">Data Engineering</span>.
      </p>
      <p>
        My expertise lies in building scalable, data-driven applications, with a focus on implementing  
        <span className="text-cyan-400 font-bold underline decoration-cyan-900"> RAG pipelines </span> and 
        <span className="text-cyan-400 font-bold underline decoration-cyan-900"> Oracle Vector Search </span> to solve complex retrieval challenges.
      </p>
      
      {/* Metadata Staggered Footer */}
      <div className="pt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-cyan-900/30">
        <div className="flex flex-col">
          <span className="text-cyan-900 text-[8px] uppercase font-black">Location</span>
          <span className="text-cyan-400 text-[9px] uppercase tracking-widest">Nairobi // KE</span>
        </div>
        <div className="flex flex-col">
          <span className="text-cyan-900 text-[8px] uppercase font-black">Affiliation</span>
          <span className="text-cyan-400 text-[9px] uppercase tracking-widest">KyU_Comp_Society</span>
        </div>
        <div className="flex flex-col">
          <span className="text-cyan-900 text-[8px] uppercase font-black">Status</span>
          <span className="text-cyan-400 text-[9px] uppercase tracking-widest italic animate-pulse underline decoration-cyan-500">Uplink_Active</span>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Data Grid: Kernel Logs & Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1 border border-cyan-900/20 p-6 bg-black/30 h-fit backdrop-blur-sm">
            <h2 className="text-[10px] text-cyan-600 mb-6 font-black uppercase tracking-widest border-b border-cyan-900/20 pb-2">Kernel_Logs</h2>
            <div ref={logContainerRef} className="space-y-3 text-[9px] text-cyan-900 font-bold max-h-64 overflow-y-auto scrollbar-hide">
              {systemLog.map((log, i) => (
                <p key={i} className="leading-relaxed border-l border-cyan-900/30 pl-2 hover:text-cyan-400 transition-colors">
                  {`> ${log}`}
                </p>
              ))}
            </div>
          </aside>

          {/* Mobile: grid-cols-1 (single stack)
  Tablet: md:grid-cols-2 
  Desktop: lg:col-span-3 (part of your larger layout)
*/}
<main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0">
  {projects.map((p, index) => {
    const cardColor = NEON_COLORS[index % NEON_COLORS.length];
    
    return (
      <div 
        key={p.id} 
        style={{ "--card-color": cardColor }}
        /* Added 'p-6' for mobile and 'md:p-8' for desktop 
           to ensure text doesn't hit the card edges on small screens 
        */
        className="reveal-node border border-cyan-900/20 bg-black/40 p-6 md:p-8 
                   transition-all duration-300 ease-out group relative overflow-hidden
                   hover:bg-[#01080a] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
      >
        {/* 1. Category Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-1 bg-cyan-500 rounded-full group-hover:animate-ping shadow-[0_0_5px_#06b6d4]" />
          <span className="text-[8px] text-cyan-800 font-black uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors">
            {p.category || "SYSTEM_NODE"}
          </span>
        </div>

        {/* 2. Interactive Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />

        {/* 3. Title - Responsive Text Size */}
        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
          {p.title}
        </h3>
        
        <p className="text-[10px] md:text-[11px] text-slate-500 my-4 md:my-5 italic leading-relaxed line-clamp-4 md:line-clamp-3 group-hover:text-slate-300">
          {p.description}
        </p>

        {/* 4. Tech Stack Tags - flex-wrap is critical for mobile */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {p.tech_stack?.map((t, i) => (
            <span 
              key={i} 
              className="text-[7px] md:text-[8px] bg-[#01080a] border border-cyan-900/30 px-2 py-0.5 text-cyan-900 font-black uppercase 
                         group-hover:border-cyan-500/30 group-hover:text-cyan-500 transition-all"
            >
              {t}
            </span>
          ))}
        </div>
        
        {/* 5. Scanning Animation Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-full w-full -translate-y-full group-hover:animate-scan-fast pointer-events-none" />
      </div>
    );
  })}
</main>
        </div>

        {/* 6. FOOTER SECTION */}
      <footer className="mt-20 border-t border-cyan-900/30 pt-10 pb-10 bg-[#020617]">
<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

 <div className="space-y-6">

 <div className="flex items-center gap-3">

 <div className="w-2 h-2 bg-cyan-500 animate-ping rounded-full"></div>
 <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em]">Establish_Comm_Link</h3>
 </div>
 <div className="relative group"> <form

 onSubmit={handleTransmit}

 className="relative group w-full max-w-md"

>

 <input
 type="text"

 value={contactMessage}
 onChange={(e) => setContactMessage(e.target.value)}
 placeholder="TYPE_MESSAGE..."
 className="w-full bg-black/40 border border-cyan-900/50 p-4 text-[11px] text-cyan-300 focus:border-cyan-400 transition-all outline-none italic placeholder:text-cyan-900"
 />
 <button
 type="submit"
 className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-cyan-400 font-black px-3 py-1.5 border border-cyan-900 uppercase hover:text-white hover:bg-cyan-500/10 transition-all bg-black"
 >
 [TRANSMIT]
 </button>

</form>
 </div>
 </div>
  {/* NEON_SOCIALS */}

<div className="flex flex-col items-center md:items-end space-y-8">
 <div className="flex flex-wrap justify-center md:justify-end gap-10">
 {/* WhatsApp - Neon Green */}
 <a href="https://wa.me/+254708443570" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
 <FaWhatsapp className="text-3xl text-slate-700 transition-all duration-500 
 group-hover:text-green-500 
 group-hover:scale-125 
 group-hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]"
 />
 <span className="text-[9px] font-black text-slate-800 transition-colors duration-500 group-hover:text-green-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
 WhatsApp
 </span>
 </a>
 {/* LinkedIn - Neon Blue */}
 <a href="https://www.linkedin.com/in/timothy-gona-479087266/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
 <FaLinkedin className="text-3xl text-slate-700 transition-all duration-500 
 group-hover:text-blue-500 

 group-hover:scale-125
 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
 <span className="text-[9px] font-black text-slate-800 transition-colors duration-500 group-hover:text-blue-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
 LinkedIn
 </span> </a>
 {/* Instagram - Neon Pink */}
  <a href="https://www.instagram.com/gmt_aesthetic/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
 <FaInstagram className="text-3xl text-slate-700 transition-all duration-500 
 group-hover:text-pink-500
 group-hover:scale-125 
 group-hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]" 
 />
 <span className="text-[9px] font-black text-slate-800 transition-colors duration-500 group-hover:text-pink-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
 Instagram
 </span>
 </a>
 {/* Email - Neon Cyan */}
 <a href="gonatimothy2@gmail.com" className="group flex flex-col items-center gap-2">

 <IoMdMail className="text-3xl text-slate-700 transition-all duration-500 

 group-hover:text-cyan-400 

 group-hover:scale-125 

  group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" 
 />

<span className="text-[9px] font-black text-slate-800 transition-colors duration-500 group-hover:text-cyan-300 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
 Email

 </span>

 </a>

</div>

<div className="text-right">

<div className="text-[8px] text-cyan-900 tracking-[0.5em] font-black uppercase group-hover:animate-pulse">

SYSTEM_UPLINK_STABLE // GMT_v2.5

 </div>

<div className="text-[7px] text-slate-800 uppercase tracking-widest mt-1">

Kirinyaga University // Software Engineering

 </div>

 </div>

</div>

 </div>

</footer>
      </div>
    </div>
  );
}

export default App;
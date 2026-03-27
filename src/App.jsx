import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CertificationNode from './components/CertificationNode';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

// --- COLOR SCHEME LOGIC ---
const getCategoryColor = (cat) => {
  const category = cat?.toUpperCase();
  switch(category) {
    case 'MACHINE_LEARNING': return 'border-purple-500/30 text-purple-400 bg-purple-950/5';
    case 'INFRASTRUCTURE': return 'border-orange-500/30 text-orange-400 bg-orange-950/5';
    case 'DESIGN': return 'border-pink-500/30 text-pink-400 bg-pink-950/5';
    case 'DATABASE': return 'border-yellow-500/30 text-yellow-400 bg-yellow-950/5';
    default: return 'border-cyan-500/20 text-cyan-400 bg-cyan-950/5';
  }
};

function App() {
  // ... your existing states (projects, loading, etc.)

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemLog, setSystemLog] = useState(["Initializing_Protocols...", "Linking_Cloud_Data_Lake..."]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', techStack: '' });

  // SECURITY_LISTENER (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const pin = window.prompt("ENTER_ACCESS_UID:");
        if (pin === "kyu2026") {
          setShowAdmin(prev => !prev);
          setSystemLog(prev => [...prev, `[AUTH_GRANTED]: Admin_Mode_${!showAdmin ? 'ON' : 'OFF'}`]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAdmin]);

// --- App.jsx ---
useEffect(() => {
  // Replace localhost with your live Render URL
  axios.get('https://gmt-1-605l.onrender.com/api/projects')
    .then(res => {
      setProjects(res.data);
      setLoading(false);
      setSystemLog(prev => [...prev, `Sync_Complete: ${res.data.length}_Nodes_Online`]);
    })
    .catch((err) => {
      setLoading(false);
      setSystemLog(prev => [...prev, "CRITICAL_ERROR: Uplink_Failed"]);
      console.error("Connection Error:", err);
    });
}, []);

  const handleUpload = async (e) => {
  e.preventDefault();
  // Using the live Render URL instead of localhost
  const API_CLOUD_URL = 'https://gmt-1-605l.onrender.com/api/projects';

  try {
    const formattedData = { 
      ...newProject, 
      techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean) 
    };

    const res = await axios.post(API_CLOUD_URL, formattedData);
    
    setProjects([...projects, res.data]);
    setNewProject({ title: '', category: '', description: '', techStack: '' });
    setShowAdmin(false);
    setSystemLog(prev => [...prev, `[SUCCESS]: Node_${res.data.title}_Injected`]);
  } catch (err) {
    setSystemLog(prev => [...prev, "[ERROR]: Injection_Protocol_Failed"]);
    console.error("Upload Error:", err);
  }
};

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-mono p-4 md:p-10 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* HEADER WITH INFINITE GLITCH */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-500/20 pb-6 mb-10 gap-4">
        <div className="relative group">
          <h1 className="text-2xl md:text-3xl font-black italic text-cyan-400 tracking-tighter animate-glitch-infinite">
            Timothy Gona Muthoni
          </h1>
          <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-700"></div>
          <p className="text-[9px] text-cyan-700 font-bold uppercase tracking-[0.2em] mt-1">
            KYU // SOFTWARE_ENGINEERING // OC7508702
          </p>
        </div>
        <div className="text-left md:text-right text-[10px] text-cyan-500/50">
          <span className="block">PORT: 5173 // UPLINK_LIVE</span>
          <span className="text-[8px] opacity-60 italic animate-pulse">SECURE_SESSION_ACTIVE</span>
        </div>
      </header>

      {/* ADMIN PANEL */}
      {showAdmin && (
        <section className="mb-10 p-6 bg-red-500/5 border border-red-500/20 animate-in fade-in zoom-in duration-300">
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="TITLE" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className="bg-black border border-cyan-900 p-2 text-[10px] text-cyan-300 outline-none focus:border-cyan-500" required />
            <input placeholder="CATEGORY" value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className="bg-black border border-cyan-900 p-2 text-[10px] text-cyan-300 outline-none focus:border-cyan-500" required />
            <textarea placeholder="DESCRIPTION" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className="bg-black border border-cyan-900 p-2 text-[10px] text-cyan-300 md:col-span-2 outline-none focus:border-cyan-500" />
            <input placeholder="TECH_STACK (split by comma)" value={newProject.techStack} onChange={(e) => setNewProject({...newProject, techStack: e.target.value})} className="bg-black border border-cyan-900 p-2 text-[10px] text-cyan-300 md:col-span-2 outline-none focus:border-cyan-500" />
            <button type="submit" className="bg-red-500/20 border border-red-500 text-red-500 py-2 text-[10px] font-black hover:bg-red-500 hover:text-black transition-all">EXECUTE_INJECTION</button>
          </form>
        </section>
      )}

      {/* HEXAGON SECTION */}
      <section className="flex flex-wrap justify-center gap-6 md:gap-12 py-10 mb-10 border-y border-cyan-500/10 bg-cyan-950/5">
        <CertificationNode issuer="Oracle AI" title="AI Vector Search" date="2025" color="cyan" modules={['RAG', 'Embeddings', 'Oracle 23ai']} />
        <CertificationNode issuer="Cisco" title="Data Science" date="2025" color="blue" modules={['Python', 'Pandas', 'Visualization']} />
        <CertificationNode issuer="PLP" title="Software Dev" date="2025" color="cyan" modules={['Full-Stack', 'Dart', 'Mobile Dev']} />
      </section>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 border border-cyan-500/20 p-4 bg-black/40 h-fit">
          <h2 className="text-[10px] font-black text-cyan-400 mb-4 tracking-[0.3em] uppercase underline">System_Logs</h2>
          <div className="space-y-2 max-h-48 overflow-y-auto text-[8px] custom-scrollbar">
            {systemLog.map((log, i) => (
              <p key={i} className="text-cyan-800"><span className="opacity-30">[{i}]</span> {log}</p>
            ))}
          </div>
        </aside>

        <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
  {projects.map((p) => {
    // We call our helper function here for each project
    const colorStyle = getCategoryColor(p.category);
    
    return (
      <div key={p._id} className={`border ${colorStyle} p-6 group hover:scale-[1.01] transition-all duration-300 relative overflow-hidden`}>
        {/* Subtle Scanline Effect for each card */}
        <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none"></div>
        
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-white transition-colors">
            {p.title}
          </h3>
          <span className={`text-[7px] border px-2 py-0.5 font-black tracking-widest ${colorStyle}`}>
            {p.category}
          </span>
        </div>

        <p className="text-[10px] text-slate-400 mb-6 leading-relaxed italic">
          {p.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {p.techStack?.map((t, i) => (
            <span key={i} className="text-[8px] bg-black/40 border border-white/5 px-2 py-0.5 text-slate-500 font-bold group-hover:border-cyan-500/30 transition-all">
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  })}
</main>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-cyan-900/30 pt-10 pb-10 bg-[#020617]"> 

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start"> 

          <div className="space-y-6"> 

            <div className="flex items-center gap-3"> 

              <div className="w-2 h-2 bg-cyan-500 animate-ping rounded-full"></div> 

              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em]">Establish_Comm_Link</h3> 

            </div> 

            <div className="relative group"> 

              <input type="text" placeholder="TYPE_MESSAGE..." className="w-full bg-black/40 border border-cyan-900/50 p-4 text-[11px] text-cyan-300 focus:border-cyan-400 transition-all outline-none italic" /> 

              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-cyan-400 font-black px-3 py-1.5 border border-cyan-900 uppercase hover:text-white transition-all bg-black">[Transmit]</button> 

            </div> 

          </div> 

 

          {/* NEON_SOCIALS */} 

<div className="flex flex-col items-center md:items-end space-y-8"> 

  <div className="flex flex-wrap justify-center md:justify-end gap-10"> 

     

    {/* WhatsApp - Neon Green */} 

    <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2"> 

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

    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2"> 

      <FaLinkedin className="text-3xl text-slate-700 transition-all duration-500  

        group-hover:text-blue-500  

        group-hover:scale-125  

        group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"  

      /> 

      <span className="text-[9px] font-black text-slate-800 transition-colors duration-500 group-hover:text-blue-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"> 

        LinkedIn 

      </span> 

    </a> 

 

    {/* Instagram - Neon Pink */} 

    <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2"> 

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

    <a href="mailto:your@email.com" className="group flex flex-col items-center gap-2"> 

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
  );
} }

export default App;
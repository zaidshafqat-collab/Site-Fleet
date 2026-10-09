"use client";
import { useState } from "react";
import { Menu, X, Layers3, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const links = [{ label: "Platform", href: "#platform" }, { label: "How it works", href: "#how-it-works" }, { label: "Why Site Fleet", href: "#why-site-fleet" }];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#080b13]/75 backdrop-blur-xl">
    <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
      <a href="#" className="flex items-center gap-3" aria-label="Site Fleet home"><span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200"><Layers3 size={19}/></span><span className="text-[17px] font-bold tracking-[-.04em]">site<span className="text-cyan-300">fleet</span><span className="ml-1 text-cyan-300">.</span></span></a>
      <div className="hidden items-center gap-8 md:flex">{links.map(link => <a key={link.href} href={link.href} className="text-sm text-slate-400 transition hover:text-white">{link.label}</a>)}</div>
      <div className="hidden md:block"><Button asChild size="sm"><a href="#contact">Talk to our team <ArrowUpRight size={15}/></a></Button></div>
      <button type="button" onClick={() => setOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-200 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </nav>
    {open && <div className="border-t border-white/10 bg-[#080b13] px-5 py-4 md:hidden">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5">{link.label}</a>)}<Button asChild className="mt-3 w-full"><a href="#contact" onClick={() => setOpen(false)}>Talk to our team <ArrowUpRight size={15}/></a></Button></div>}
  </header>;
}

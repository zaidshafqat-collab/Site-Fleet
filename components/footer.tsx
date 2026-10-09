import { ArrowUpRight, Layers3, Mail, MoveUpRight } from "lucide-react";
export function Footer() {
  return <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#070910]"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"/>
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
      <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_.6fr_.8fr]">
        <div><a href="#" className="inline-flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200"><Layers3 size={20}/></span><span className="text-lg font-bold tracking-tight">site<span className="text-cyan-300">fleet</span><span className="text-cyan-300">.</span></span></a><h2 className="mt-6 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Build a smarter way to run every site.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">One connected view of your field operations, assets, and teams — ready for what comes next.</p></div>
        <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-slate-500">Explore</h3><div className="mt-5 flex flex-col gap-3 text-sm text-slate-300"><a className="hover:text-cyan-200" href="#platform">Platform</a><a className="hover:text-cyan-200" href="#how-it-works">How it works</a><a className="hover:text-cyan-200" href="#why-site-fleet">Why Site Fleet</a></div></div>
        <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-slate-500">Get in touch</h3><a href="mailto:zaid.shafqat@rungta.org" className="mt-5 inline-flex items-center gap-2 break-all text-sm text-cyan-200 transition hover:text-white"><Mail size={16}/> zaid.shafqat@rungta.org <MoveUpRight size={14}/></a><p className="mt-3 text-sm leading-6 text-slate-500">Have a complex operation? Let’s make it run beautifully.</p></div>
      </div>
      <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Site Fleet. Built for operations in motion.</span><a href="#top" className="inline-flex items-center gap-1 hover:text-white">Back to top <ArrowUpRight size={13}/></a></div>
    </div>
  </footer>;
}

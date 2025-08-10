import Head from 'next/head'
import { useMemo, useState, useEffect } from 'react'
import AdSenseLoader from '@/components/AdSenseLoader'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Head>
        <title>TrendFuse — Viral Video Trends Tracker</title>
        <meta name="description" content="See rising sounds, formats, and hashtags across TikTok, YouTube Shorts, and Reels. Generate hooks, schedule posts, and get a weekly brief."/>
      </Head>
      <AdSenseLoader clientId="ca-pub-4117575935725411" />
      <Header />
      <Main />
      <Footer />
      <StructuredData />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-sky-400" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">TrendFuse</h1>
            <p className="text-xs text-neutral-400">Viral Video Trends Tracker</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#newsletter" className="hidden md:inline text-sm bg-white text-neutral-950 px-3 py-2 rounded-xl font-medium">Weekly Trend Report</a>
        </div>
      </div>
    </header>
  )
}

function Main() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <Hero />
      <AdSlot label="Top Banner" slot="2765432190" />
      <TrendsSection />
      <HookLab />
      <HashtagLab />
      <Scheduler />
      <Monetize />
      <Newsletter />
      <Faq />
    </main>
  )
}

function Hero() {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-900/40 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">Spot trends early. Ship content faster.</h2>
          <p className="mt-3 text-neutral-300 text-sm">See rising sounds, formats, and hashtags across TikTok, YouTube Shorts, and Reels. Generate hooks, schedule posts, and get a weekly brief—automatically.</p>
          <div className="mt-5 flex gap-3">
            <a href="#trends" className="px-4 py-2 rounded-xl bg-white text-neutral-950 text-sm font-medium">Browse Trends</a>
            <a href="#hooklab" className="px-4 py-2 rounded-xl bg-neutral-800 text-white text-sm font-medium">Open Hook Lab</a>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-xs text-neutral-300">
          <ul className="space-y-2">
            <li>• Data sources: public APIs / curated feeds</li>
            <li>• Latency: ~1–24h (configurable)</li>
            <li>• Export: CSV / JSON / Clipboard</li>
            <li>• Monetization: Ads + affiliates + premium</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function AdSlot({ label, slot = "1234567890" }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });
  return (
    <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/60 p-3">
      <div className="text-[11px] text-neutral-500 px-3">Ad Slot — {label}</div>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4117575935725411"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true" />
    </div>
  )
}

const MOCK_TRENDS = [
  { platform: "TikTok", type: "Sound", name: "anxiety_remix_v3", growth: 182, uses24h: 9200, ctrIdea: 1.6 },
  { platform: "YouTube", type: "Format", name: "fast-cut-storytime", growth: 74, uses24h: 3100, ctrIdea: 1.2 },
  { platform: "Instagram", type: "Hashtag", name: "#backtoschoolhaul", growth: 233, uses24h: 12800, ctrIdea: 1.8 },
  { platform: "TikTok", type: "Hashtag", name: "#quietluxurydupe", growth: 96, uses24h: 2800, ctrIdea: 1.1 },
  { platform: "YouTube", type: "Sound", name: "retro_synth_loop_84bpm", growth: 51, uses24h: 1450, ctrIdea: 1.05 },
];

function TrendsSection() {
  const [platform, setPlatform] = useState("All");
  const [query, setQuery] = useState("");
  const trends = useMemo(() => {
    return MOCK_TRENDS.filter((t) =>
      (platform === "All" || t.platform === platform) &&
      (query === "" || t.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [platform, query]);

  return (
    <section id="trends" className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-xl font-semibold">Rising Trends</h3>
        <div className="flex items-center gap-2 text-sm">
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
            {['All','TikTok','YouTube','Instagram'].map((p) => <option key={p}>{p}</option>)}
          </select>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2" />
          <ExportCSV rows={trends} />
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="text-left px-3 py-2">Platform</th>
              <th className="text-left px-3 py-2">Type</th>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-right px-3 py-2">24h Uses</th>
              <th className="text-right px-3 py-2">Growth %</th>
              <th className="text-right px-3 py-2">Hook CTR ▲</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((t, i) => (
              <tr key={i} className="border-t border-neutral-800">
                <td className="px-3 py-2">{t.platform}</td>
                <td className="px-3 py-2">{t.type}</td>
                <td className="px-3 py-2 font-medium">{t.name}</td>
                <td className="px-3 py-2 text-right">{t.uses24h.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">{t.growth}%</td>
                <td className="px-3 py-2 text-right">{t.ctrIdea.toFixed(2)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-neutral-500">Sample data. Connect your data feed or a JSON endpoint later.</p>
    </section>
  )
}

function ExportCSV({ rows }) {
  function toCSV() {
    const headers = ["platform","type","name","uses24h","growth","ctrIdea"]; 
    const csv = [headers.join(",")]
      .concat(rows.map(r => headers.map(h => r[h]).join(",")))
      .join("\\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'trends.csv'; a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button onClick={toCSV} className="px-3 py-2 text-xs rounded-xl border border-neutral-800">Export CSV</button>
  )
}

function HookLab() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Curiosity");
  const [n, setN] = useState(7);
  const hooks = useMemo(() => buildHooks(topic, style, n), [topic, style, n]);
  return (
    <section id="hooklab" className="space-y-4">
      <h3 className="text-xl font-semibold">Hook Lab</h3>
      <div className="grid md:grid-cols-4 gap-3 text-sm">
        <input value={topic} onChange={(e)=>setTopic(e.target.value)} placeholder="Topic (e.g., anxiety song hack)" className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 md:col-span-2"/>
        <select value={style} onChange={(e)=>setStyle(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
          {["Curiosity","Shock","Relatable","Humor","Authority","Drama"].map(s=> <option key={s}>{s}</option>)}
        </select>
        <input type="number" min={3} max={20} value={n} onChange={(e)=>setN(Number(e.target.value))} className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2"/>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {hooks.map((h,i)=> (
          <div key={i} className="rounded-xl bg-neutral-900 border border-neutral-800 p-3 text-sm">{h}</div>
        ))}
      </div>
      <div className="text-xs text-neutral-400">Tip: Pair with trending sounds from the table above for max lift.</div>
    </section>
  )
}

function buildHooks(topic, style, n=7) {
  if(!topic) return [];
  const bank = {
    Curiosity: [
      `I tried ${topic} so you don’t have to…`,
      `${topic} has a secret no one’s talking about…`,
      `I found the ONE thing about ${topic} that changes everything`,
      `Before you try ${topic}, watch this`,
      `What they never mention about ${topic} (until now)`,
    ],
    Shock: [
      `Stop doing ${topic} like this.`,
      `${topic} almost ruined my channel`,
      `This ${topic} trick should be illegal`,
      `I was today years old when I learned this about ${topic}`,
    ],
    Relatable: [
      `If ${topic} stresses you out, same`,
      `POV: you tried ${topic} and…`,
      `Me pretending ${topic} is easy`,
      `Tell me you struggle with ${topic} without telling me…`,
    ],
    Humor: [
      `${topic}? more like ${topic}-ocalypse`,
      `My therapist banned me from talking about ${topic}… so here we are`,
      `I did ${topic} before coffee. Mistakes were made`,
    ],
    Authority: [
      `I’ve edited 1,000 videos. Here’s the ${topic} rule that works`,
      `3 pro tips to fix your ${topic} in 30 seconds`,
      `Steal my ${topic} template (please)`,
    ],
    Drama: [
      `This is your sign to try ${topic}`,
      `I wasn’t going to post this ${topic}… but`,
      `The ${topic} everyone’s faking`,
    ]
  };
  const pool = bank[style] || bank.Curiosity;
  const out = [];
  for(let i=0;i<n;i++){ out.push(pool[i % pool.length]); }
  return out;
}

function HashtagLab(){
  const [seed, setSeed] = useState("");
  const [tier, setTier] = useState("Balanced");
  const tags = useMemo(()=> buildHashtags(seed, tier), [seed, tier]);
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Hashtag Lab</h3>
      <div className="grid md:grid-cols-3 gap-3 text-sm">
        <input value={seed} onChange={(e)=>setSeed(e.target.value)} placeholder="#seed or topic keyword" className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2"/>
        <select value={tier} onChange={(e)=>setTier(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
          {["Balanced","Low Comp","High Volume"].map(t=> <option key={t}>{t}</option>)}
        </select>
        <button className="px-4 py-2 bg-white text-neutral-950 rounded-xl font-medium" onClick={()=>{}}>Refresh</button>
      </div>
      {seed && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-sm grid md:grid-cols-3 gap-3">
          {tags.map((t,i)=> <Tag key={i} text={t}/>) }
        </div>
      )}
      <p className="text-[11px] text-neutral-500">Tip: Mix 2–3 low competition tags, 2 medium, 1 high volume.</p>
    </section>
  )
}

function Tag({ text }){
  function copy(){ navigator.clipboard.writeText(text); }
  return <button onClick={copy} className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-neutral-600 text-xs">{text}</button>;
}

function buildHashtags(seed, tier){
  if(!seed) return [];
  const base = seed.replace(/[#\\s]+/g, "").toLowerCase();
  const low = [ `#${base}tips`, `#${base}hack`, `#${base}daily`, `#${base}forbeginners` ];
  const med = [ `#${base}`, `#${base}challenge`, `#learn${base}`, `#howto${base}` ];
  const high = [ `#viral`, `#fyp`, `#trending`, `#shorts` ];
  if(tier === "Low Comp") return [...low, ...med.slice(0,2)];
  if(tier === "High Volume") return [...med, ...high];
  return [ ...low.slice(0,2), ...med.slice(0,3), high[0] ];
}

function Scheduler(){
  const [timezone, setTimezone] = useState("America/Denver");
  const [goal, setGoal] = useState("Views");
  const rec = useMemo(()=> recommendTimes(timezone, goal), [timezone, goal]);
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Smart Post Times</h3>
      <div className="grid md:grid-cols-3 gap-3 text-sm">
        <select value={timezone} onChange={(e)=>setTimezone(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
          {['America/Denver','America/Chicago','America/New_York','America/Los_Angeles','UTC'].map(t=> <option key={t}>{t}</option>)}
        </select>
        <select value={goal} onChange={(e)=>setGoal(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
          {["Views","Engagement","Shares"].map(g=> <option key={g}>{g}</option>)}
        </select>
        <button className="px-4 py-2 bg-white text-neutral-950 rounded-xl font-medium">Copy Times</button>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-sm grid md:grid-cols-3 gap-3">
        {rec.map((t,i)=> (
          <div key={i} className="rounded-xl bg-neutral-950 border border-neutral-800 p-3">
            <div className="font-medium">{t.day}</div>
            <div className="text-neutral-400 text-xs mt-1">{t.times.join(', ')}</div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-neutral-500">Heuristic windows; refine later with your analytics.</p>
    </section>
  )
}

function recommendTimes(tz, goal){
  const base = ["08:15","11:45","15:30","20:10"];
  const days = ["Mon","Wed","Fri","Sun","Tue","Thu","Sat"];
  const pick = days.slice(0,6).map((d,i)=> ({ day: d, times: base.slice(0, (i%3)+2) }));
  if(goal === "Shares") return pick.map(p=> ({...p, times: p.times.map(t=> t.replace(":",""))}));
  return pick;
}

function Monetize(){
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
      <h3 className="text-base font-semibold">Monetization</h3>
      <ul className="list-disc pl-5 text-sm text-neutral-300 mt-2 space-y-1">
        <li>Ads: AdSense via automatic loader + manual slots.</li>
        <li>Affiliate: Link to editing apps, gear, stock music.</li>
        <li>Premium: Offer a $5/mo weekly PDF trend brief + templates.</li>
      </ul>
    </section>
  )
}

function Newsletter(){
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/your_placeholder";
  async function submit(e){
    e.preventDefault();
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if(res.ok){ setOk(true); } else { alert('Submission failed. Replace FORMSPREE_ENDPOINT.'); }
    } catch(err){ alert('Network error.'); }
  }
  return (
    <section id="newsletter" className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
      <h3 className="text-base font-semibold">Get the Weekly Trend Report</h3>
      {!ok ? (
        <form onSubmit={submit} className="grid md:grid-cols-3 gap-3 text-sm mt-2">
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 md:col-span-2" required/>
          <button className="px-4 py-2 bg-white text-neutral-950 rounded-xl font-medium">Subscribe</button>
        </form>
      ) : (
        <div className="rounded-xl border border-emerald-700/40 bg-emerald-900/20 p-4 text-emerald-300 text-sm mt-3">Thanks! You’ll get your first brief next Monday.</div>
      )}
      <p className="text-[11px] text-neutral-500 mt-3">Create a free Formspree form and replace the endpoint.</p>
    </section>
  )
}

function Faq(){
  const qas = [
    {q: "Where does the data come from?", a: "Public APIs, curated feeds, and optionally your own JSON updated by a daily cron."},
    {q: "Is scraping allowed?", a: "Follow each platform’s ToS. Prefer official APIs or third-party providers."},
    {q: "Will it run without keys?", a: "Yes—mock data is bundled so the app loads instantly."}
  ];
  return (
    <section className="space-y-4">
      <h3 className="text-base font-semibold">FAQ</h3>
      <div className="grid md:grid-cols-3 gap-3">
        {qas.map((qa,i)=> (
          <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm">
            <div className="font-medium">{qa.q}</div>
            <div className="text-neutral-400 text-xs mt-1">{qa.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="border-t border-neutral-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 text-xs text-neutral-400 flex justify-between flex-wrap gap-3">
        <span>TrendFuse © {new Date().getFullYear()}</span>
        <div className="flex items-center gap-4">
          <a className="underline" href="#">Terms</a>
          <a className="underline" href="#">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

function StructuredData(){
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrendFuse — Viral Video Trends Tracker",
    url: "https://trendfuse.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://trendfuse.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(json)}}/>;
}
"use client";

import { useState, useMemo, useCallback } from "react";

// ─── DUMMY DATA ────────────────────────────────────────────────────────────────

const SKILLS_TREND = [
  { skill: "React", jan:88, feb:89, mar:91, apr:93, may:94, jun:95, jul:94, aug:96, sep:97, oct:96, nov:97, dec:98, category:"Frontend" },
  { skill: "Next.js", jan:55, feb:58, mar:62, apr:66, may:70, jun:74, jul:78, aug:82, sep:85, oct:87, nov:90, dec:93, category:"Frontend" },
  { skill: "TypeScript", jan:60, feb:63, mar:67, apr:70, may:73, jun:76, jul:79, aug:82, sep:84, oct:86, nov:88, dec:91, category:"Language" },
  { skill: "Vue.js", jan:52, feb:51, mar:51, apr:50, may:50, jun:49, jul:48, aug:48, sep:47, oct:46, nov:45, dec:44, category:"Frontend" },
  { skill: "Angular", jan:48, feb:47, mar:46, apr:45, may:44, jun:43, jul:42, aug:41, sep:40, oct:39, nov:38, dec:37, category:"Frontend" },
  { skill: "Node.js", jan:72, feb:73, mar:73, apr:74, may:74, jun:75, jul:76, aug:76, sep:77, oct:77, nov:78, dec:79, category:"Backend" },
  { skill: "Python", jan:80, feb:81, mar:82, apr:83, may:84, jun:85, jul:86, aug:87, sep:88, oct:89, nov:90, dec:92, category:"Language" },
  { skill: "Tailwind CSS", jan:40, feb:44, mar:49, apr:54, may:60, jun:65, jul:70, aug:74, sep:78, oct:82, nov:85, dec:88, category:"Frontend" },
  { skill: "GraphQL", jan:38, feb:39, mar:40, apr:40, may:41, jun:41, jul:40, aug:40, sep:39, oct:39, nov:38, dec:37, category:"API" },
  { skill: "Docker", jan:55, feb:57, mar:59, apr:61, may:63, jun:65, jul:67, aug:68, sep:70, oct:71, nov:73, dec:75, category:"DevOps" },
  { skill: "AWS", jan:65, feb:66, mar:67, apr:68, may:69, jun:70, jul:71, aug:72, sep:73, oct:74, nov:75, dec:77, category:"Cloud" },
  { skill: "Rust", jan:10, feb:11, mar:12, apr:14, may:15, jun:17, jul:19, aug:22, sep:24, oct:27, nov:30, dec:34, category:"Language" },
];

const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SALARY_DATA = [
  { role:"Frontend Dev",    city:"Bangalore",  min:8,  mid:14, max:22, currency:"LPA" },
  { role:"Frontend Dev",    city:"Hyderabad",  min:7,  mid:13, max:20, currency:"LPA" },
  { role:"Frontend Dev",    city:"Mumbai",     min:9,  mid:15, max:24, currency:"LPA" },
  { role:"Frontend Dev",    city:"Pune",       min:7,  mid:12, max:18, currency:"LPA" },
  { role:"Frontend Dev",    city:"Delhi NCR",  min:8,  mid:14, max:22, currency:"LPA" },
  { role:"Senior Frontend", city:"Bangalore",  min:18, mid:26, max:40, currency:"LPA" },
  { role:"Senior Frontend", city:"Hyderabad",  min:16, mid:24, max:36, currency:"LPA" },
  { role:"Senior Frontend", city:"Mumbai",     min:18, mid:27, max:42, currency:"LPA" },
  { role:"Senior Frontend", city:"Pune",       min:15, mid:22, max:32, currency:"LPA" },
  { role:"Senior Frontend", city:"Delhi NCR",  min:17, mid:25, max:38, currency:"LPA" },
  { role:"Full Stack",      city:"Bangalore",  min:12, mid:20, max:32, currency:"LPA" },
  { role:"Full Stack",      city:"Hyderabad",  min:10, mid:18, max:28, currency:"LPA" },
  { role:"Full Stack",      city:"Mumbai",     min:12, mid:21, max:34, currency:"LPA" },
  { role:"Full Stack",      city:"Pune",       min:10, mid:17, max:26, currency:"LPA" },
  { role:"Full Stack",      city:"Delhi NCR",  min:11, mid:19, max:30, currency:"LPA" },
  { role:"Tech Lead",       city:"Bangalore",  min:28, mid:38, max:60, currency:"LPA" },
  { role:"Tech Lead",       city:"Hyderabad",  min:24, mid:34, max:52, currency:"LPA" },
  { role:"Tech Lead",       city:"Mumbai",     min:28, mid:40, max:62, currency:"LPA" },
  { role:"Tech Lead",       city:"Pune",       min:22, mid:32, max:48, currency:"LPA" },
  { role:"Tech Lead",       city:"Delhi NCR",  min:25, mid:36, max:55, currency:"LPA" },
];

const COMPANIES = [
  { name:"Flipkart",      stack:["React","TypeScript","Node.js","AWS"],        openRoles:12, trend:"up",   category:"E-commerce",  activeHiring:true,  avgSalary:22 },
  { name:"Swiggy",        stack:["React","Next.js","GraphQL","Go"],            openRoles:8,  trend:"up",   category:"Food-tech",   activeHiring:true,  avgSalary:24 },
  { name:"Zomato",        stack:["React","TypeScript","Python","GCP"],         openRoles:6,  trend:"flat", category:"Food-tech",   activeHiring:true,  avgSalary:20 },
  { name:"CRED",          stack:["React Native","TypeScript","Kotlin"],        openRoles:4,  trend:"up",   category:"Fintech",     activeHiring:true,  avgSalary:28 },
  { name:"Razorpay",      stack:["React","Node.js","TypeScript","AWS"],        openRoles:9,  trend:"up",   category:"Fintech",     activeHiring:true,  avgSalary:26 },
  { name:"Meesho",        stack:["React","Python","Kubernetes","GCP"],         openRoles:7,  trend:"up",   category:"E-commerce",  activeHiring:true,  avgSalary:21 },
  { name:"PhonePe",       stack:["React","Java","Spring Boot","AWS"],          openRoles:5,  trend:"flat", category:"Fintech",     activeHiring:true,  avgSalary:25 },
  { name:"Byju's",        stack:["React","Angular","Node.js"],                 openRoles:2,  trend:"down", category:"Edtech",      activeHiring:false, avgSalary:14 },
  { name:"Ola",           stack:["React","Next.js","Go","Kubernetes"],         openRoles:5,  trend:"flat", category:"Mobility",    activeHiring:true,  avgSalary:20 },
  { name:"Paytm",         stack:["React","Vue.js","Java","MySQL"],             openRoles:3,  trend:"down", category:"Fintech",     activeHiring:false, avgSalary:16 },
  { name:"Freshworks",    stack:["Vue.js","React","Rails","AWS"],              openRoles:10, trend:"up",   category:"SaaS",        activeHiring:true,  avgSalary:23 },
  { name:"Zoho",          stack:["React","Java","MySQL","GCP"],                openRoles:15, trend:"up",   category:"SaaS",        activeHiring:true,  avgSalary:18 },
  { name:"InMobi",        stack:["React","Go","Spark","AWS"],                  openRoles:4,  trend:"flat", category:"AdTech",      activeHiring:true,  avgSalary:22 },
  { name:"Groww",         stack:["React","TypeScript","Python","Kafka"],       openRoles:6,  trend:"up",   category:"Fintech",     activeHiring:true,  avgSalary:27 },
  { name:"Dunzo",         stack:["React","Node.js","MongoDB"],                 openRoles:1,  trend:"down", category:"Quick-comm",  activeHiring:false, avgSalary:12 },
];

const ALL_SKILLS = [
  "React","Next.js","TypeScript","JavaScript","Vue.js","Angular","Svelte",
  "Node.js","Python","Go","Java","Rust","Ruby","PHP",
  "GraphQL","REST API","tRPC",
  "Tailwind CSS","CSS-in-JS","SCSS",
  "Docker","Kubernetes","AWS","GCP","Azure",
  "PostgreSQL","MongoDB","Redis","MySQL",
  "Git","CI/CD","Jest","Playwright","Vitest",
  "React Query","Redux","Zustand","Jotai",
  "Framer Motion","Three.js","D3.js",
  "React Native","Flutter",
  "Figma","Storybook","Webpack","Vite",
];

const TOP_ROLES_REQUIREMENTS = {
  "Frontend Dev (2-4 yrs)":    ["React","TypeScript","CSS-in-JS","REST API","Git","Jest","Vite","Redux"],
  "Senior Frontend (5-7 yrs)": ["React","Next.js","TypeScript","React Query","Tailwind CSS","Playwright","CI/CD","System Design","GraphQL","Docker"],
  "Full Stack (3-6 yrs)":      ["React","Node.js","TypeScript","PostgreSQL","Docker","REST API","AWS","Redis","Git","CI/CD"],
  "Tech Lead (7+ yrs)":        ["React","Next.js","TypeScript","System Design","Docker","Kubernetes","AWS","CI/CD","Playwright","Mentoring","GraphQL"],
};

// ─── COLOUR / UTIL HELPERS ─────────────────────────────────────────────────────

const COLOR_MAP = {
  Frontend:"#378ADD", Language:"#7F77DD", Backend:"#1D9E75",
  API:"#BA7517", DevOps:"#D85A30", Cloud:"#0F6E56",
};

function trendIcon(current, prev) {
  const d = current - prev;
  if (d > 0) return { icon:"↑", color:"#1D9E75", label:`+${d}` };
  if (d < 0) return { icon:"↓", color:"#E24B4A", label:`${d}` };
  return { icon:"→", color:"#888780", label:"0" };
}

function salaryColor(val, min, max) {
  const pct = (val - min) / (max - min);
  if (pct < 0.33) return "#E1F5EE";
  if (pct < 0.66) return "#9FE1CB";
  return "#1D9E75";
}

// ─── MINI SPARKLINE ────────────────────────────────────────────────────────────

function Sparkline({ data, color = "#378ADD", width = 80, height = 28 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ display:"block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── MINI BAR ──────────────────────────────────────────────────────────────────

function MiniBar({ value, max = 100, color = "#378ADD" }) {
  return (
    <div style={{ background:"#f0f0f0", borderRadius:3, height:6, width:"100%" }}>
      <div style={{ width:`${(value/max)*100}%`, background:color, height:6, borderRadius:3, transition:"width 0.4s" }} />
    </div>
  );
}

// ─── TREND BADGE ───────────────────────────────────────────────────────────────

function TrendBadge({ trend }) {
  const cfg = {
    up:   { bg:"#E1F5EE", color:"#0F6E56", label:"↑ Hiring" },
    flat: { bg:"#F1EFE8", color:"#5F5E5A", label:"→ Stable" },
    down: { bg:"#FCEBEB", color:"#A32D2D", label:"↓ Slowing" },
  }[trend] || {};
  return (
    <span style={{ fontSize:11, padding:"2px 8px", borderRadius:20, background:cfg.bg, color:cfg.color, fontWeight:500 }}>
      {cfg.label}
    </span>
  );
}

// ─── TAB NAV ───────────────────────────────────────────────────────────────────

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"8px 18px", border:"none", borderBottom: active ? "2px solid #378ADD" : "2px solid transparent",
      background:"transparent", cursor:"pointer", fontWeight: active ? 600 : 400,
      color: active ? "#378ADD" : "#555", fontSize:14, transition:"all 0.15s",
    }}>
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — SKILL TRENDS
// ═══════════════════════════════════════════════════════════════════════════════

function SkillTrends() {
  const [selectedMonth, setSelectedMonth] = useState("dec");
  const [sortBy, setSortBy] = useState("demand"); // demand | growth | name
  const [filterCat, setFilterCat] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const categories = ["All", ...Array.from(new Set(SKILLS_TREND.map(s => s.category)))];

  const processed = useMemo(() => {
    return SKILLS_TREND
      .filter(s => filterCat === "All" || s.category === filterCat)
      .filter(s => s.skill.toLowerCase().includes(searchQ.toLowerCase()))
      .map(s => {
        const idx = MONTHS.indexOf(selectedMonth);
        const prev = idx > 0 ? s[MONTHS[idx - 1]] : s[MONTHS[0]];
        const curr = s[selectedMonth];
        const growth = curr - s["jan"];
        return { ...s, curr, prev, growth, trend: trendIcon(curr, prev) };
      })
      .sort((a, b) => {
        if (sortBy === "demand") return b.curr - a.curr;
        if (sortBy === "growth") return b.growth - a.growth;
        return a.skill.localeCompare(b.skill);
      });
  }, [selectedMonth, sortBy, filterCat, searchQ]);

  const monthIdx = MONTHS.indexOf(selectedMonth);
  const sparkData = (s) => MONTHS.slice(0, monthIdx + 1).map(m => s[m]);

  return (
    <div>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:600 }}>Skill Demand Trends</h2>
      <p style={{ margin:"0 0 16px", color:"#666", fontSize:13 }}>
        How much employers mention each skill in job postings — scored 0–100. Track rising stars and fading tech.
      </p>

      {/* Controls */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 }}>
        <input
          placeholder="Search skill..."
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          style={{ padding:"6px 12px", border:"1px solid #ddd", borderRadius:6, fontSize:13, width:160 }}
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          <option value="demand">Sort: Highest Demand</option>
          <option value="growth">Sort: Most Growth (YTD)</option>
          <option value="name">Sort: A–Z</option>
        </select>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:"auto" }}>
          <span style={{ fontSize:12, color:"#888" }}>Month:</span>
          <input type="range" min={0} max={11} value={monthIdx}
            onChange={e => setSelectedMonth(MONTHS[+e.target.value])}
            style={{ width:120 }} />
          <span style={{ fontSize:13, fontWeight:600, minWidth:28 }}>{MONTH_LABELS[monthIdx]}</span>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
        {[
          { label:"Top skill", value: processed[0]?.skill ?? "—", sub: `${processed[0]?.curr ?? 0}/100 demand` },
          { label:"Fastest growing (YTD)", value: [...processed].sort((a,b)=>b.growth-a.growth)[0]?.skill ?? "—",
            sub: `+${[...processed].sort((a,b)=>b.growth-a.growth)[0]?.growth ?? 0} pts since Jan` },
          { label:"Fastest declining", value: [...processed].sort((a,b)=>a.growth-b.growth)[0]?.skill ?? "—",
            sub: `${[...processed].sort((a,b)=>a.growth-b.growth)[0]?.growth ?? 0} pts since Jan` },
        ].map(card => (
          <div key={card.label} style={{ background:"#f7f7f7", borderRadius:8, padding:"10px 14px" }}>
            <div style={{ fontSize:11, color:"#888", marginBottom:4 }}>{card.label}</div>
            <div style={{ fontSize:16, fontWeight:600 }}>{card.value}</div>
            <div style={{ fontSize:11, color:"#666" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid #eee" }}>
              {["Skill","Category","Demand","Month Δ","YTD Growth","12-month trend"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"6px 10px", color:"#888", fontWeight:500, whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processed.map(s => (
              <tr key={s.skill} style={{ borderBottom:"1px solid #f0f0f0" }}>
                <td style={{ padding:"8px 10px", fontWeight:600 }}>{s.skill}</td>
                <td style={{ padding:"8px 10px" }}>
                  <span style={{ fontSize:11, padding:"2px 8px", borderRadius:20, background: COLOR_MAP[s.category] + "22", color: COLOR_MAP[s.category], fontWeight:500 }}>
                    {s.category}
                  </span>
                </td>
                <td style={{ padding:"8px 10px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontWeight:600, minWidth:26 }}>{s.curr}</span>
                    <div style={{ flex:1, minWidth:60 }}><MiniBar value={s.curr} color={COLOR_MAP[s.category]} /></div>
                  </div>
                </td>
                <td style={{ padding:"8px 10px", color: s.trend.color, fontWeight:500 }}>
                  {s.trend.icon} {s.trend.label}
                </td>
                <td style={{ padding:"8px 10px", color: s.growth > 0 ? "#1D9E75" : s.growth < 0 ? "#E24B4A" : "#888", fontWeight:500 }}>
                  {s.growth > 0 ? "+" : ""}{s.growth}
                </td>
                <td style={{ padding:"8px 10px" }}>
                  <Sparkline data={sparkData(s)} color={COLOR_MAP[s.category]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — SALARY EXPLORER
// ═══════════════════════════════════════════════════════════════════════════════

function SalaryExplorer() {
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [salaryView, setSalaryView] = useState("mid"); // min | mid | max
  const [yearsExp, setYearsExp] = useState(5);

  const roles = ["All", ...Array.from(new Set(SALARY_DATA.map(d => d.role)))];
  const cities = ["All", ...Array.from(new Set(SALARY_DATA.map(d => d.city)))];

  const filtered = useMemo(() => {
    return SALARY_DATA.filter(d =>
      (selectedRole === "All" || d.role === selectedRole) &&
      (selectedCity === "All" || d.city === selectedCity)
    );
  }, [selectedRole, selectedCity]);

  // Estimate salary based on experience
  const estimateSalary = useCallback((base) => {
    const multiplier = 1 + (yearsExp - 2) * 0.08;
    return Math.round(base * Math.max(0.7, Math.min(multiplier, 2.0)));
  }, [yearsExp]);

  // Heatmap: roles vs cities
  const heatmapRoles = ["Frontend Dev","Senior Frontend","Full Stack","Tech Lead"];
  const heatmapCities = ["Bangalore","Hyderabad","Mumbai","Pune","Delhi NCR"];
  const allVals = SALARY_DATA.map(d => d[salaryView]);
  const heatMin = Math.min(...allVals);
  const heatMax = Math.max(...allVals);

  function getHeatVal(role, city) {
    return SALARY_DATA.find(d => d.role === role && d.city === city)?.[salaryView] ?? 0;
  }

  function heatBg(val) {
    if (!val) return "#f5f5f5";
    const pct = (val - heatMin) / (heatMax - heatMin);
    if (pct < 0.25) return "#E1F5EE";
    if (pct < 0.5)  return "#9FE1CB";
    if (pct < 0.75) return "#5DCAA5";
    return "#1D9E75";
  }
  function heatText(val) {
    const pct = (val - heatMin) / (heatMax - heatMin);
    return pct > 0.5 ? "#fff" : "#085041";
  }

  const avgAll = filtered.length ? Math.round(filtered.reduce((s,d) => s + d[salaryView], 0) / filtered.length) : 0;
  const maxAll = filtered.length ? Math.max(...filtered.map(d => d[salaryView])) : 0;

  return (
    <div>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:600 }}>Salary Explorer</h2>
      <p style={{ margin:"0 0 16px", color:"#666", fontSize:13 }}>
        Real salary ranges across roles and cities. Adjust experience to estimate your market rate.
      </p>

      {/* Experience estimator */}
      <div style={{ background:"#EEF4FF", borderRadius:10, padding:"14px 18px", marginBottom:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <span style={{ fontSize:13, fontWeight:500 }}>Your experience:</span>
          <input type="range" min={1} max={12} value={yearsExp} onChange={e => setYearsExp(+e.target.value)} style={{ width:130 }} />
          <span style={{ fontSize:15, fontWeight:700, color:"#185FA5" }}>{yearsExp} yrs</span>
          <span style={{ fontSize:13, color:"#555", marginLeft:8 }}>→ Estimated market rate:</span>
          <span style={{ fontSize:18, fontWeight:700, color:"#185FA5" }}>
            ₹{estimateSalary(14)}–{estimateSalary(26)} LPA
          </span>
        </div>
      </div>

      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 }}>
        <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ display:"flex", gap:4, marginLeft:"auto" }}>
          {["min","mid","max"].map(v => (
            <button key={v} onClick={() => setSalaryView(v)}
              style={{ padding:"5px 14px", border:`1px solid ${salaryView===v?"#378ADD":"#ddd"}`,
                borderRadius:6, background: salaryView===v ? "#378ADD" : "#fff",
                color: salaryView===v ? "#fff" : "#555", fontSize:12, cursor:"pointer", fontWeight:500 }}>
              {v === "min" ? "Floor" : v === "mid" ? "Median" : "Top"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
        <div style={{ background:"#f7f7f7", borderRadius:8, padding:"10px 14px" }}>
          <div style={{ fontSize:11, color:"#888" }}>Average ({salaryView})</div>
          <div style={{ fontSize:20, fontWeight:700, color:"#185FA5" }}>₹{avgAll} LPA</div>
        </div>
        <div style={{ background:"#f7f7f7", borderRadius:8, padding:"10px 14px" }}>
          <div style={{ fontSize:11, color:"#888" }}>Highest paying ({salaryView})</div>
          <div style={{ fontSize:20, fontWeight:700, color:"#1D9E75" }}>₹{maxAll} LPA</div>
        </div>
      </div>

      {/* Heatmap */}
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:13, fontWeight:600, marginBottom:8 }}>
          {salaryView === "min" ? "Floor" : salaryView === "mid" ? "Median" : "Top"} Salary Heatmap (LPA)
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ borderCollapse:"separate", borderSpacing:4, fontSize:12 }}>
            <thead>
              <tr>
                <th style={{ padding:"6px 10px", textAlign:"left", color:"#888", fontWeight:500, fontSize:11 }}>Role ↓ / City →</th>
                {heatmapCities.map(c => (
                  <th key={c} style={{ padding:"6px 10px", color:"#555", fontWeight:500, whiteSpace:"nowrap" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapRoles.map(role => (
                <tr key={role}>
                  <td style={{ padding:"6px 10px", fontWeight:500, fontSize:12, whiteSpace:"nowrap", color:"#333" }}>{role}</td>
                  {heatmapCities.map(city => {
                    const val = getHeatVal(role, city);
                    return (
                      <td key={city} style={{
                        padding:"8px 14px", background:heatBg(val), color:heatText(val),
                        borderRadius:6, textAlign:"center", fontWeight:600,
                      }}>
                        {val ? `₹${val}L` : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize:11, color:"#aaa", marginTop:6 }}>
          Color: lighter = lower, darker = higher. Adjust Floor / Median / Top above.
        </div>
      </div>

      {/* Bar list */}
      {filtered.length > 0 && (
        <div>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:8 }}>Salary range breakdown</div>
          {filtered.map(d => (
            <div key={`${d.role}-${d.city}`} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8, fontSize:13 }}>
              <div style={{ width:160, whiteSpace:"nowrap", color:"#333" }}>{d.role} · {d.city}</div>
              <div style={{ flex:1, position:"relative", height:20, background:"#f0f0f0", borderRadius:4 }}>
                {/* bar: min to max */}
                <div style={{
                  position:"absolute",
                  left:`${(d.min/60)*100}%`,
                  width:`${((d.max-d.min)/60)*100}%`,
                  height:"100%", background:"#B5D4F4", borderRadius:4
                }} />
                {/* median marker */}
                <div style={{
                  position:"absolute",
                  left:`${(d.mid/60)*100}%`,
                  transform:"translateX(-50%)",
                  width:3, height:"100%", background:"#185FA5", borderRadius:2
                }} />
              </div>
              <div style={{ fontSize:12, color:"#555", whiteSpace:"nowrap" }}>
                ₹{d.min}–{d.max}L <span style={{ color:"#185FA5", fontWeight:600 }}>(₹{d.mid}L)</span>
              </div>
            </div>
          ))}
          <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>Blue bar = range, dark line = median</div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — COMPANY PULSE
// ═══════════════════════════════════════════════════════════════════════════════

function CompanyPulse() {
  const [search, setSearch] = useState("");
  const [trendFilter, setTrendFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [sortBy, setSortBy] = useState("openRoles");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const categories = ["All", ...Array.from(new Set(COMPANIES.map(c => c.category)))];

  const filtered = useMemo(() => {
    return COMPANIES
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      .filter(c => trendFilter === "All" || c.trend === trendFilter)
      .filter(c => catFilter === "All" || c.category === catFilter)
      .sort((a, b) => {
        if (sortBy === "openRoles") return b.openRoles - a.openRoles;
        if (sortBy === "salary") return b.avgSalary - a.avgSalary;
        return a.name.localeCompare(b.name);
      });
  }, [search, trendFilter, catFilter, sortBy]);

  const company = selectedCompany ? COMPANIES.find(c => c.name === selectedCompany) : null;

  const activeCount = COMPANIES.filter(c => c.activeHiring).length;
  const totalRoles = COMPANIES.reduce((s, c) => s + c.openRoles, 0);

  return (
    <div>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:600 }}>Company Hiring Pulse</h2>
      <p style={{ margin:"0 0 16px", color:"#666", fontSize:13 }}>
        Which Indian companies are actively hiring, what tech they use, and what they pay.
      </p>

      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
        {[
          { label:"Actively hiring", value:`${activeCount} / ${COMPANIES.length}`, color:"#1D9E75" },
          { label:"Total open roles", value:totalRoles, color:"#185FA5" },
          { label:"Avg salary (LPA)", value:`₹${Math.round(COMPANIES.reduce((s,c)=>s+c.avgSalary,0)/COMPANIES.length)}L`, color:"#7F77DD" },
        ].map(s => (
          <div key={s.label} style={{ background:"#f7f7f7", borderRadius:8, padding:"10px 14px" }}>
            <div style={{ fontSize:11, color:"#888" }}>{s.label}</div>
            <div style={{ fontSize:20, fontWeight:700, color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
        <input placeholder="Search company..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding:"6px 12px", border:"1px solid #ddd", borderRadius:6, fontSize:13, width:170 }} />
        <select value={trendFilter} onChange={e => setTrendFilter(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          <option value="All">All trends</option>
          <option value="up">Hiring ↑</option>
          <option value="flat">Stable →</option>
          <option value="down">Slowing ↓</option>
        </select>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding:"6px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
          <option value="openRoles">Sort: Open Roles</option>
          <option value="salary">Sort: Salary</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      <div style={{ display:"flex", gap:16 }}>
        {/* List */}
        <div style={{ flex:1, minWidth:0 }}>
          {filtered.length === 0 && (
            <div style={{ color:"#aaa", padding:"20px 0", textAlign:"center", fontSize:13 }}>No companies match your filters.</div>
          )}
          {filtered.map(c => (
            <div key={c.name}
              onClick={() => setSelectedCompany(selectedCompany === c.name ? null : c.name)}
              style={{
                padding:"10px 14px", marginBottom:8, borderRadius:8, cursor:"pointer",
                border:`1.5px solid ${selectedCompany === c.name ? "#378ADD" : "#eee"}`,
                background: selectedCompany === c.name ? "#EEF4FF" : "#fff",
                transition:"all 0.15s",
              }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
                <TrendBadge trend={c.trend} />
              </div>
              <div style={{ display:"flex", gap:12, fontSize:12, color:"#666", alignItems:"center" }}>
                <span>{c.category}</span>
                <span>•</span>
                <span style={{ color: c.activeHiring ? "#1D9E75" : "#E24B4A", fontWeight:500 }}>
                  {c.openRoles} open roles
                </span>
                <span>•</span>
                <span>Avg ₹{c.avgSalary}L</span>
              </div>
              <div style={{ marginTop:6, display:"flex", flexWrap:"wrap", gap:4 }}>
                {c.stack.map(s => (
                  <span key={s} style={{ fontSize:11, padding:"1px 7px", borderRadius:20, background:"#f0f0f0", color:"#555" }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {company && (
          <div style={{ width:240, flexShrink:0, background:"#f7f7f7", borderRadius:10, padding:"14px 16px", height:"fit-content" }}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>{company.name}</div>
            <TrendBadge trend={company.trend} />
            <div style={{ marginTop:12 }}>
              {[
                ["Category", company.category],
                ["Open roles", company.openRoles],
                ["Avg salary", `₹${company.avgSalary} LPA`],
                ["Status", company.activeHiring ? "Actively hiring" : "Hiring paused"],
              ].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
                  <span style={{ color:"#888" }}>{l}</span>
                  <span style={{ fontWeight:500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:10 }}>
              <div style={{ fontSize:11, color:"#888", marginBottom:6 }}>Tech stack</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {company.stack.map(s => (
                  <span key={s} style={{ fontSize:11, padding:"2px 9px", borderRadius:20, background:"#378ADD22", color:"#185FA5", fontWeight:500 }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop:12, fontSize:12, color:"#666", lineHeight:1.5 }}>
              {company.activeHiring
                ? `${company.name} is actively scaling — ${company.openRoles} positions open. Skills in demand: ${company.stack.slice(0,2).join(", ")}.`
                : `${company.name} has slowed hiring. Watch for Q1 budget refresh.`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 4 — SKILL GAP ANALYZER
// ═══════════════════════════════════════════════════════════════════════════════

function SkillGapAnalyzer() {
  const [mySkills, setMySkills] = useState([]);
  const [targetRole, setTargetRole] = useState("Senior Frontend (5-7 yrs)");
  const [search, setSearch] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const required = TOP_ROLES_REQUIREMENTS[targetRole] || [];
  const matched = mySkills.filter(s => required.includes(s));
  const missing = required.filter(s => !mySkills.includes(s));
  const extra = mySkills.filter(s => !required.includes(s));
  const score = required.length ? Math.round((matched.length / required.length) * 100) : 0;

  const filteredSuggestions = ALL_SKILLS.filter(s =>
    !mySkills.includes(s) && s.toLowerCase().includes(search.toLowerCase()) && search.length > 0
  ).slice(0, 8);

  function addSkill(skill) {
    if (!mySkills.includes(skill)) setMySkills(prev => [...prev, skill]);
    setSearch("");
  }

  function removeSkill(skill) {
    setMySkills(prev => prev.filter(s => s !== skill));
  }

  const scoreColor = score >= 80 ? "#1D9E75" : score >= 50 ? "#BA7517" : "#E24B4A";
  const scoreLabel = score >= 80 ? "Strong match" : score >= 50 ? "Moderate match" : "Needs work";

  const learningPriority = missing.map(skill => {
    const demand = SKILLS_TREND.find(s => s.skill === skill)?.dec ?? 50;
    return { skill, demand };
  }).sort((a, b) => b.demand - a.demand);

  return (
    <div>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:600 }}>Skill Gap Analyzer</h2>
      <p style={{ margin:"0 0 16px", color:"#666", fontSize:13 }}>
        Add your current skills, pick a target role, and see exactly what to learn next.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Left: input */}
        <div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>Target role</label>
            <select value={targetRole} onChange={e => { setTargetRole(e.target.value); setAnalyzed(false); }}
              style={{ width:"100%", padding:"8px 10px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}>
              {Object.keys(TOP_ROLES_REQUIREMENTS).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div style={{ marginBottom:8 }}>
            <label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>Your skills ({mySkills.length})</label>
            <div style={{ position:"relative" }}>
              <input
                placeholder="Type to add skill..."
                value={search}
                onChange={e => { setSearch(e.target.value); setAnalyzed(false); }}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid #ddd", borderRadius:6, fontSize:13 }}
              />
              {filteredSuggestions.length > 0 && (
                <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"#fff", border:"1px solid #ddd",
                  borderRadius:6, boxShadow:"0 4px 12px #0001", zIndex:10, maxHeight:200, overflowY:"auto" }}>
                  {filteredSuggestions.map(s => (
                    <div key={s} onClick={() => addSkill(s)}
                      style={{ padding:"7px 12px", fontSize:13, cursor:"pointer", borderBottom:"1px solid #f5f5f5" }}
                      onMouseOver={e => e.currentTarget.style.background="#f7f7f7"}
                      onMouseOut={e => e.currentTarget.style.background="#fff"}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick-add popular */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:"#aaa", marginBottom:5 }}>Quick add popular:</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {["React","TypeScript","Next.js","Node.js","Tailwind CSS","Docker","AWS"].filter(s => !mySkills.includes(s)).map(s => (
                <button key={s} onClick={() => addSkill(s)}
                  style={{ fontSize:11, padding:"3px 10px", border:"1px dashed #ccc", borderRadius:20, background:"transparent", cursor:"pointer", color:"#555" }}>
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* My skills chips */}
          {mySkills.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
              {mySkills.map(s => (
                <span key={s} style={{
                  fontSize:12, padding:"3px 10px", borderRadius:20, cursor:"pointer",
                  background: required.includes(s) ? "#E1F5EE" : "#f0f0f0",
                  color: required.includes(s) ? "#0F6E56" : "#555",
                  border: `1px solid ${required.includes(s) ? "#9FE1CB" : "#ddd"}`,
                  display:"flex", alignItems:"center", gap:5
                }}>
                  {s}
                  <span onClick={() => removeSkill(s)} style={{ opacity:0.5, fontWeight:700, fontSize:11 }}>×</span>
                </span>
              ))}
            </div>
          )}

          <button onClick={() => setAnalyzed(true)} disabled={mySkills.length === 0}
            style={{
              width:"100%", padding:"10px", border:"none", borderRadius:8,
              background: mySkills.length === 0 ? "#eee" : "#378ADD",
              color: mySkills.length === 0 ? "#aaa" : "#fff",
              fontSize:14, fontWeight:600, cursor: mySkills.length === 0 ? "not-allowed" : "pointer",
              transition:"background 0.15s"
            }}>
            Analyze my skill gap →
          </button>
        </div>

        {/* Right: results */}
        <div>
          {!analyzed ? (
            <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"#ccc", fontSize:13, textAlign:"center", padding:20 }}>
              Add your skills and click Analyze to see your gap vs {targetRole}
            </div>
          ) : (
            <div>
              {/* Score */}
              <div style={{ textAlign:"center", padding:"16px 0 12px", background:"#f7f7f7", borderRadius:10, marginBottom:16 }}>
                <div style={{ fontSize:48, fontWeight:700, color:scoreColor, lineHeight:1 }}>{score}%</div>
                <div style={{ fontSize:14, fontWeight:600, color:scoreColor, marginTop:4 }}>{scoreLabel}</div>
                <div style={{ fontSize:12, color:"#888", marginTop:4 }}>
                  {matched.length} of {required.length} required skills matched
                </div>
              </div>

              {/* Match bar */}
              <div style={{ marginBottom:14 }}>
                <div style={{ height:10, background:"#eee", borderRadius:5 }}>
                  <div style={{ width:`${score}%`, height:10, background:scoreColor, borderRadius:5, transition:"width 0.5s" }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#aaa", marginTop:3 }}>
                  <span>0%</span><span>50%</span><span>100%</span>
                </div>
              </div>

              {/* Missing */}
              {missing.length > 0 && (
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#E24B4A", marginBottom:6 }}>
                    Missing ({missing.length})
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {missing.map(s => (
                      <span key={s} style={{ fontSize:12, padding:"3px 10px", borderRadius:20, background:"#FCEBEB", color:"#A32D2D", border:"1px solid #F7C1C1" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched */}
              {matched.length > 0 && (
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#1D9E75", marginBottom:6 }}>
                    You have ({matched.length})
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {matched.map(s => (
                      <span key={s} style={{ fontSize:12, padding:"3px 10px", borderRadius:20, background:"#E1F5EE", color:"#0F6E56", border:"1px solid #9FE1CB" }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bonus */}
              {extra.length > 0 && (
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#BA7517", marginBottom:6 }}>Bonus skills ({extra.length})</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {extra.map(s => (
                      <span key={s} style={{ fontSize:12, padding:"3px 10px", borderRadius:20, background:"#FAEEDA", color:"#854F0B", border:"1px solid #FAC775" }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Learning priority */}
      {analyzed && learningPriority.length > 0 && (
        <div style={{ marginTop:20, borderTop:"1px solid #eee", paddingTop:16 }}>
          <div style={{ fontSize:14, fontWeight:600, marginBottom:10 }}>
            What to learn next — ranked by market demand
          </div>
          {learningPriority.map((item, i) => (
            <div key={item.skill} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8, fontSize:13 }}>
              <span style={{ width:20, height:20, borderRadius:"50%", background:"#f0f0f0", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>
                {i + 1}
              </span>
              <span style={{ width:130, fontWeight:500 }}>{item.skill}</span>
              <div style={{ flex:1 }}><MiniBar value={item.demand} color={scoreColor} /></div>
              <span style={{ fontSize:12, color:"#888", minWidth:60, textAlign:"right" }}>
                demand: {item.demand}/100
              </span>
            </div>
          ))}
          <div style={{ marginTop:10, fontSize:12, color:"#888", background:"#f7f7f7", borderRadius:8, padding:"8px 12px" }}>
            💡 Focus on #{learningPriority[0]?.skill} first — highest employer demand and will immediately boost your match score for <strong>{targetRole}</strong>.
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { key:"trends",   label:"📈 Skill Trends" },
  { key:"salary",   label:"💰 Salary Explorer" },
  { key:"companies",label:"🏢 Company Pulse" },
  { key:"gap",      label:"🎯 Skill Gap" },
];

export default function DevPulse() {
  const [activeTab, setActiveTab] = useState("trends");

  return (
    <div style={{ fontFamily:"system-ui, -apple-system, sans-serif", maxWidth:900, margin:"0 auto", padding:"0 0 40px" }}>
      {/* Header */}
      <div style={{ padding:"18px 0 0", marginBottom:4 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
          <span style={{ fontSize:22, fontWeight:700, letterSpacing:-0.5 }}>DevPulse</span>
          <span style={{ fontSize:13, color:"#888" }}>India developer job market intelligence</span>
        </div>
        <div style={{ fontSize:12, color:"#bbb", marginTop:2 }}>
          Data updated: Dec 2024 · {COMPANIES.length} companies · {SKILLS_TREND.length} skills tracked
        </div>
      </div>

      {/* Nav */}
      <div style={{ borderBottom:"1px solid #eee", marginBottom:20, display:"flex" }}>
        {TABS.map(t => (
          <Tab key={t.key} label={t.label} active={activeTab === t.key} onClick={() => setActiveTab(t.key)} />
        ))}
      </div>

      {/* Screens */}
      <div style={{ padding:"0 2px" }}>
        {activeTab === "trends"    && <SkillTrends />}
        {activeTab === "salary"    && <SalaryExplorer />}
        {activeTab === "companies" && <CompanyPulse />}
        {activeTab === "gap"       && <SkillGapAnalyzer />}
      </div>
    </div>
  );
}

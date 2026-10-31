import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ShieldCheck, UserRound, Building2, Ship } from "lucide-react";

const DEMO_ACCOUNTS = [
  { role: "User", email: "demo.user@cargomate.com", password: "User@123", path: "/user-dashboard", icon: UserRound, color: "blue", description: "Explore trade tools and user features" },
  { role: "B2B", email: "demo.b2b@cargomate.com", password: "B2B@123", path: "/b2b-dashboard", icon: Building2, color: "teal", description: "Access business and B2B features" },
  { role: "Admin", email: "demo.admin@cargomate.com", password: "Admin@123", path: "/admin-dashboard", icon: ShieldCheck, color: "violet", description: "Open the admin management dashboard" },
];

export default function DemoLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const chooseAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const account = DEMO_ACCOUNTS.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );
    if (!account) {
      setError("Invalid demo email or password. Select a demo account below to autofill its credentials.");
      return;
    }
    // Frontend-only demo login. No backend/API request is made.
    navigate(account.path);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <section className="hidden text-white lg:block">
          <button onClick={() => navigate("/")} className="mb-12 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
            <Ship className="h-4 w-4" /> CargoMate demo access
          </div>
          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight">One platform.<br /><span className="text-teal-300">Three ways to work.</span></h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">Sign in with a demo account to preview the User, B2B, or Admin dashboard. No backend integration is used.</p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Frontend-only demo</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">No API requests</span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl">
          <button onClick={() => navigate("/")} className="mb-5 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>
          <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-9">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-teal-300"><Ship className="h-6 w-6" /></div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Choose a demo role or enter its credentials below.</p>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              {DEMO_ACCOUNTS.map((account) => {
                const Icon = account.icon;
                const selected = email === account.email;
                return (
                  <button key={account.role} type="button" onClick={() => chooseAccount(account)}
                    className={`rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selected ? "border-teal-500 bg-teal-50 ring-2 ring-teal-100" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${account.color === "blue" ? "bg-blue-100 text-blue-700" : account.color === "teal" ? "bg-teal-100 text-teal-700" : "bg-violet-100 text-violet-700"}`}><Icon className="h-5 w-5" /></div>
                    <div className="font-semibold text-slate-900">{account.role}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{account.description}</div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="demo-email" className="mb-1.5 block text-sm font-semibold text-slate-700">Email address</label>
                <input id="demo-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Select a demo account or enter email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </div>
              <div>
                <label htmlFor="demo-password" className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <input id="demo-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter demo password" className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
              </div>
              {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              <button type="submit" className="w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">Sign in to dashboard</button>
            </form>

            <div className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
              Demo mode only: credentials are checked in the frontend. Do not use these demo credentials as real authentication.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

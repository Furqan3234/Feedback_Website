import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-600 rounded-md flex items-center justify-center text-white font-bold">FB</div>
          <h1 className="text-lg font-semibold">Feedback System</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-slate-700 hover:text-slate-900">Give Feedback</Link>
          <Link href="/login" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700">Sign in</Link>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Make school meals better with your feedback</h2>
          <p className="text-slate-600 mb-6">Share honest feedback about meal quality, hygiene, portion sizes and variety — your responses help administrators improve the menu and dining experience.</p>

          <div className="flex gap-3">
            <Link href="/login" className="px-6 py-3 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700">Give Feedback</Link>
            <Link href="/login" className="px-6 py-3 border border-slate-200 rounded-md hover:bg-slate-100">Admin / Sign in</Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Quick overview</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">🍽️</span>
              <div>
                <div className="font-medium">Rate meals</div>
                <div className="text-sm text-slate-500">Answer short rating questions about taste, temperature and portion size.</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">🧼</span>
              <div>
                <div className="font-medium">Report hygiene</div>
                <div className="text-sm text-slate-500">Let administrators know about cleanliness or presentation issues.</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">📊</span>
              <div>
                <div className="font-medium">Admin dashboard</div>
                <div className="text-sm text-slate-500">Admins can view aggregated feedback and act on suggestions.</div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Fast</h4>
            <p className="text-sm text-slate-500">Submit feedback in under a minute from any device.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Anonymous options</h4>
            <p className="text-sm text-slate-500">Users can leave feedback without exposing identity (configurable).</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Actionable</h4>
            <p className="text-sm text-slate-500">Admin tools help prioritize and act on high-impact suggestions.</p>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-500 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Feedback System</div>
        <div className="flex gap-4">
          <Link href="/login" className="hover:underline">Privacy</Link>
          <Link href="/login" className="hover:underline">Terms</Link>
        </div>
      </footer>
    </main>
  );
}

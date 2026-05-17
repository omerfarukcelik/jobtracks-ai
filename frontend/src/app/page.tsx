import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Briefcase, FileText, Sparkles, TrendingUp, ShieldCheck } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white-50 via-orange-50 to-white-50">
      <header className="flex items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">JobTracks AI</span>
          <span className="flex gap-0.5">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 text-center">
        <section className="flex min-h-[70vh] flex-col items-center justify-center">
          <div className="mb-4 rounded-full border bg-white/70 px-4 py-2 text-sm text-muted-foreground shadow-sm">
            Full-stack job tracking platform with AI-powered features
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Track applications, resumes, and interviews in one place
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            JobTracks AI helps job seekers organize applications, monitor progress,
            manage resumes, and prepare for smarter AI-powered recommendations.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="h-12 px-8 bg-amber-600 hover:bg-amber-700">
              <Link href="/register">Create an Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 bg-white/70">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>

        </section>

        {/* <section
          id="features"
          className="grid w-full max-w-5xl gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "Track Applications",
              text: "Organize companies, roles, statuses, dates, and notes.",
              icon: Briefcase,
              color: "bg-amber-100 text-amber-600",
            },
            {
              title: "Manage Resumes",
              text: "Store resumes and prepare versions for different roles.",
              icon: FileText,
              color: "bg-orange-100 text-orange-600",
            },
            {
              title: "AI Recommendations",
              text: "Plan smarter job recommendations based on user profile data.",
              icon: Sparkles,
              color: "bg-yellow-100 text-yellow-600",
            },
            {
              title: "Track Progress",
              text: "View dashboard insights for applications and interviews.",
              icon: TrendingUp,
              color: "bg-amber-100 text-amber-600",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`flex size-12 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.text}
              </p>
            </div>
          ))}
        </section> */}

      </main>

      <footer className="border-t bg-white/40 px-6 py-6 text-center text-sm text-muted-foreground">
        <p>Built to help job seekers stay organized and make smarter career decisions.</p>
      </footer>
    </div>
  )
}
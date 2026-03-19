import Link from "next/link"
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <section className="max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          JobTracks AI
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Track your job applications smarter
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          A full-stack job application tracker that helps users manage
          applications, monitor progress, and prepare for AI-powered job
          recommendations.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button>
            <Link href="/login">Go to Login</Link>
          </Button>
          <Button variant="secondary">
            <Link href="/register">
              Create Account
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

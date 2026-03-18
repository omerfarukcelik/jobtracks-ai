import PageHeader from "@/components/ui/PageHeader";

export default function DashboardPage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <PageHeader
                    title="Dashboard"
                    description="Your job application insights and activity will appear here."
                />
                <p className="mt-4 text-slate-600">
                    Your job application insights and activity will appear here.
                </p>
            </div>
        </main>
    );
}